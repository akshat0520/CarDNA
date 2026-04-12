"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type { CarMatch, DimensionKey, QuizResult } from "@/types";

const DIMENSION_LABELS: Record<DimensionKey, string> = {
  control: "Driver Control",
  tech: "Technology",
  status: "Status",
  signal: "Road Presence",
  risk: "Risk Appetite",
  future: "Future Readiness",
};

function CircleFit({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, score));
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);

  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" strokeWidth="8" className="fill-none stroke-zinc-800" />
        <circle
          cx="50"
          cy="50"
          r="44"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="fill-none stroke-amber-400 transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-2xl font-black text-white">{Math.round(clamped)}%</p>
        <p className="text-[10px] uppercase tracking-wide text-zinc-400">Personality Fit</p>
      </div>
    </div>
  );
}

function CarCard({ match, rank }: { match: CarMatch; rank: number }) {
  const car = match.car;

  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-black">
            #{rank} {rank === 1 ? "Best Match" : "Top Match"}
          </span>
          <h3 className="mt-4 text-3xl font-black text-white">
            {car.make} {car.model}
          </h3>
          <p className="mt-1 text-sm text-zinc-400">{car.variant}</p>
          <p className="mt-3 text-xl font-bold text-amber-400">Rs{car.price_lakh.toFixed(2)} L</p>
        </div>

        <CircleFit score={match.fitScore} />
      </div>

      <div className="mt-7 border-l-4 border-amber-400 pl-4 italic text-white">
        {match.convictionSentence}
      </div>

      <div className="mt-8 space-y-4">
        {match.dimensionBreakdown.map((item) => (
          <div key={item.dimension} className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-300">
                {DIMENSION_LABELS[item.dimension]}
              </p>
              <p className="text-xs text-zinc-500">
                You: {item.userScore.toFixed(1)} / 10 | Car: {item.carScore.toFixed(1)} / 10
              </p>
            </div>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              <div>
                <p className="mb-1 text-xs text-zinc-500">Your Score</p>
                <div className="h-2 rounded-full bg-zinc-800">
                  <div
                    className="h-2 rounded-full bg-amber-400"
                    style={{ width: `${Math.max(0, Math.min(100, item.userScore * 10))}%` }}
                  />
                </div>
              </div>
              <div>
                <p className="mb-1 text-xs text-zinc-500">Car Score</p>
                <div className="h-2 rounded-full bg-zinc-800">
                  <div
                    className="h-2 rounded-full bg-zinc-500"
                    style={{ width: `${Math.max(0, Math.min(100, item.carScore * 10))}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-zinc-500">{item.specEvidence}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-zinc-300">{car.summary}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">{car.fuel_type}</span>
        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">{car.transmission}</span>
        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">{car.power_bhp} bhp</span>
        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
          0-100: {car.zero_to_100_sec}s
        </span>
        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
          Safety: {car.safety_rating_ncap ?? "N/A"}
        </span>
      </div>
    </article>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const shortlistRef = useRef<HTMLElement | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("driverDNA_result");
    if (!raw) {
      router.replace("/");
      return;
    }

    try {
      const parsed = JSON.parse(raw) as QuizResult;
      setResult(parsed);
      requestAnimationFrame(() => setBarsVisible(true));
    } catch {
      router.replace("/");
    }
  }, [router]);

  const orderedDimensions = useMemo(() => {
    if (!result) {
      return [] as DimensionKey[];
    }

    return (Object.keys(result.dimensionScores) as DimensionKey[]).sort(
      (a, b) => result.dimensionScores[b] - result.dimensionScores[a],
    );
  }, [result]);

  if (!result) {
    return <main className="min-h-screen bg-zinc-950" />;
  }

  const [first, ...rest] = result.matches;

  return (
    <main className="bg-zinc-950 text-white">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="text-8xl">{result.archetype.emoji}</div>
        <h1 className="mt-5 text-5xl font-black text-white">{result.archetype.name}</h1>
        <p className="mt-4 text-xl text-amber-400">{result.archetype.tagline}</p>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400">
          {result.archetype.description}
        </p>

        <div className="mt-10 w-full max-w-3xl space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 text-left">
          {orderedDimensions.map((dimension, index) => {
            const score = result.dimensionScores[dimension];
            return (
              <div key={dimension}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-zinc-300">{DIMENSION_LABELS[dimension]}</span>
                  <span className="font-semibold text-amber-400">{score.toFixed(1)}</span>
                </div>
                <div className="h-2 rounded-full bg-zinc-800">
                  <div
                    className="h-2 rounded-full bg-amber-400 transition-all duration-1000 ease-out"
                    style={{
                      width: barsVisible ? `${score * 10}%` : "0%",
                      transitionDelay: `${index * 100}ms`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => shortlistRef.current?.scrollIntoView({ behavior: "smooth" })}
          className="mt-10 rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition-all duration-200 ease-in-out hover:border-amber-400 hover:text-amber-400"
        >
          See My Cars ↓
        </button>
      </section>

      <section ref={shortlistRef} className="mx-auto w-full max-w-6xl px-6 pb-14">
        <h2 className="text-3xl font-bold text-white">Your Shortlist</h2>
        <p className="mt-2 text-zinc-500">Ranked by personality fit</p>

        {first ? (
          <div className="mt-8">
            <CarCard match={first} rank={1} />
          </div>
        ) : null}

        {rest.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.map((match, index) => (
              <CarCard key={match.car.id} match={match} rank={index + 2} />
            ))}
          </div>
        ) : null}

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <Link
            href="/quiz"
            className="rounded-full bg-zinc-800 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-zinc-700"
          >
            Take the quiz again
          </Link>
          <p className="text-sm text-zinc-500">DriverDNA - Know yourself. Buy better.</p>
        </div>
      </section>
    </main>
  );
}
