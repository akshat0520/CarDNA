import { NextResponse } from "next/server";

import { getAllCars } from "@/lib/db";
import {
  TECHNICAL_QUESTIONS,
  buildTechnicalProfile,
  buildTechnicalReasons,
  computeTechnicalFitScore,
} from "@/lib/technical";
import type { TechnicalCarMatch, TechnicalResult } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TechnicalSubmitPayload = {
  answers?: number[];
  budgetMaxLakh?: number;
};

function isValidAnswers(answers: unknown): answers is number[] {
  return (
    Array.isArray(answers) &&
    answers.length === TECHNICAL_QUESTIONS.length &&
    answers.every((value) => Number.isInteger(value) && value >= 0 && value <= 3)
  );
}

export async function POST(
  request: Request,
): Promise<NextResponse<TechnicalResult | { error: string }>> {
  try {
    const body = (await request.json()) as TechnicalSubmitPayload;

    if (!isValidAnswers(body.answers)) {
      return NextResponse.json(
        { error: `Invalid answers payload. Expected ${TECHNICAL_QUESTIONS.length} integers from 0 to 3.` },
        { status: 400 },
      );
    }

    const budgetMaxLakh =
      typeof body.budgetMaxLakh === "number" && Number.isFinite(body.budgetMaxLakh)
        ? body.budgetMaxLakh
        : null;

    const profile = buildTechnicalProfile(body.answers);
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

    const matches: TechnicalCarMatch[] = cars
      .map((car) => ({
        car,
        fitScore: computeTechnicalFitScore(car, profile),
        technicalReasons: buildTechnicalReasons(car, profile),
      }))
      .sort((a, b) => b.fitScore - a.fitScore)
      .slice(0, 3);

    const response: TechnicalResult = {
      budgetMaxLakh,
      matches,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("POST /api/technical/submit failed:", error);
    return NextResponse.json(
      { error: "Failed to process technical recommendation request." },
      { status: 500 },
    );
  }
}
