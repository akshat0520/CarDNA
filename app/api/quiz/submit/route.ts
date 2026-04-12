import { NextResponse } from "next/server";

import { assignArchetype } from "@/lib/archetypes";
import { db, getAllCars } from "@/lib/db";
import { generateConvictionSentence } from "@/lib/gemini";
import { DIMENSIONS, computeDimensionScores } from "@/lib/scoring";
import type {
  Car,
  CarMatch,
  DimensionKey,
  DimensionScores,
  QuizResult,
} from "@/types";

export const runtime = "nodejs";

type QuizSubmitPayload = {
  answers?: number[];
  budgetMaxLakh?: number;
};

function isValidAnswers(answers: unknown): answers is number[] {
  return (
    Array.isArray(answers) &&
    answers.length === 12 &&
    answers.every((value) => Number.isInteger(value) && value >= 0 && value <= 3)
  );
}

function getCarDimensionScore(car: Car, dimension: DimensionKey): number {
  switch (dimension) {
    case "control":
      return car.score_control;
    case "tech":
      return car.score_tech;
    case "status":
      return car.score_status;
    case "signal":
      return car.score_signal;
    case "risk":
      return car.score_risk;
    case "future":
      return car.score_future;
    default:
      return 0;
  }
}

function toLabel(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildSpecEvidence(car: Car, dimension: DimensionKey): string {
  switch (dimension) {
    case "control":
      return `0-100 in ${car.zero_to_100_sec}s · ${car.suspension_type} · ${car.steering_type} · ${car.ride_quality} ride`;
    case "tech":
      return `ADAS L${car.adas_level} · ${car.infotainment_size_inch}-inch infotainment · OTA ${car.ota_updates ? "supported" : "not available"}`;
    case "status":
      return `Exclusivity ${car.exclusivity_score}/10 · Rs${car.price_lakh.toFixed(2)}L · ${car.design_language}`;
    case "signal":
      return `${car.design_language} · Exclusivity ${car.exclusivity_score}/10 · ${car.body_type}`;
    case "risk":
      return `Safety ${car.safety_rating_ncap ?? "N/A"} stars · 0-100 in ${car.zero_to_100_sec}s`;
    case "future":
      return `${car.fuel_type} · Range ${car.range_km ?? "N/A"}km · OTA ${car.ota_updates ? "supported" : "not available"}`;
    default:
      return "";
  }
}

function computeFitScore(userScores: DimensionScores, car: Car): number {
  const sum = DIMENSIONS.reduce((acc, dimension) => {
    return acc + userScores[dimension] * getCarDimensionScore(car, dimension);
  }, 0);

  const fitScore = sum / DIMENSIONS.length;
  return Number(Math.max(0, Math.min(100, fitScore)).toFixed(2));
}

function getTopDimensions(scores: DimensionScores, count = 2): DimensionKey[] {
  return [...DIMENSIONS]
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, count);
}

function buildDimensionBreakdown(
  car: Car,
  userScores: DimensionScores,
): CarMatch["dimensionBreakdown"] {
  return [...DIMENSIONS]
    .sort((a, b) => userScores[b] - userScores[a])
    .map((dimension) => ({
      dimension,
      userScore: Number(userScores[dimension].toFixed(2)),
      carScore: getCarDimensionScore(car, dimension),
      specEvidence: buildSpecEvidence(car, dimension),
    }));
}

export async function POST(
  request: Request,
): Promise<NextResponse<QuizResult | { error: string }>> {
  try {
    const body = (await request.json()) as QuizSubmitPayload;

    if (!isValidAnswers(body.answers)) {
      return NextResponse.json(
        { error: "Invalid answers payload. Expected 12 integers from 0 to 3." },
        { status: 400 },
      );
    }

    const dimensionScores = computeDimensionScores(body.answers);
    const archetype = assignArchetype(dimensionScores);
    const budgetMaxLakh =
      typeof body.budgetMaxLakh === "number" && Number.isFinite(body.budgetMaxLakh)
        ? body.budgetMaxLakh
        : null;

    const cars = getAllCars().filter((car) =>
      budgetMaxLakh ? car.price_lakh <= budgetMaxLakh : true,
    );

    if (cars.length === 0) {
      return NextResponse.json(
        {
          error:
            "No cars found under your selected budget. Increase the budget and try again.",
        },
        { status: 404 },
      );
    }

    const ranked = cars
      .map((car) => ({
        car,
        fitScore: computeFitScore(dimensionScores, car),
        dimensionBreakdown: buildDimensionBreakdown(car, dimensionScores),
      }))
      .sort((a, b) => b.fitScore - a.fitScore)
      .slice(0, 3);

    const topDimensions = getTopDimensions(dimensionScores, 2);
    const topDimensionLabels = topDimensions.map(toLabel);

    const matches: CarMatch[] = await Promise.all(
      ranked.map(async ({ car, fitScore, dimensionBreakdown }) => {
        const specHighlights = topDimensions
          .map((dimension) => `${toLabel(dimension)}: ${buildSpecEvidence(car, dimension)}`)
          .join(" | ");

        let convictionSentence = car.tagline;
        try {
          convictionSentence = await generateConvictionSentence(
            archetype.name,
            topDimensionLabels,
            {
              make: car.make,
              model: car.model,
              variant: car.variant,
              tagline: car.tagline,
              summary: car.summary,
            },
            specHighlights,
          );
        } catch (geminiError) {
          console.warn("Gemini failed. Falling back to car tagline:", geminiError);
        }

        return {
          car,
          fitScore,
          convictionSentence,
          dimensionBreakdown,
        };
      }),
    );

    db.prepare(
      `
      INSERT INTO quiz_sessions (
        answers,
        dimension_scores,
        archetype,
        recommended_cars
      ) VALUES (?, ?, ?, ?)
      `,
    ).run(
      JSON.stringify(body.answers),
      JSON.stringify(dimensionScores),
      JSON.stringify(archetype),
      JSON.stringify(matches.map((match) => ({
        carId: match.car.id,
        fitScore: match.fitScore,
      }))),
    );

    const response: QuizResult = {
      archetype,
      dimensionScores,
      matches,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("POST /api/quiz/submit failed:", error);
    return NextResponse.json(
      { error: "Failed to process quiz submission." },
      { status: 500 },
    );
  }
}
