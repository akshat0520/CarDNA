"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type { TechnicalResult } from "@/types";

function FitBar({ score }: { score: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-zinc-500">
        <span>Technical Fit</span>
        <span>{Math.round(score)}%</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-800">
        <div
          className="h-2 rounded-full bg-amber-400 transition-all duration-700"
          style={{ width: `${Math.max(0, Math.min(100, score))}%` }}
        />
      </div>
    </div>
  );
}

export default function TechnicalResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<TechnicalResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("driverDNA_technical_result");
    if (!raw) {
      router.replace("/");
      return;
    }

    try {
      setResult(JSON.parse(raw) as TechnicalResult);
    } catch {
      router.replace("/");
    }
  }, [router]);

  if (!result) {
    return <main className="min-h-screen bg-zinc-950" />;
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <section className="mx-auto w-full max-w-6xl">
        <p className="text-sm uppercase tracking-[0.16em] text-amber-400">
          Technical Recommendation
        </p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">Your Engineer-Grade Shortlist</h1>
        <p className="mt-4 max-w-3xl text-zinc-400">
          Ranked only by technical compatibility from your preferences. No personality scoring used.
        </p>
        {result.budgetMaxLakh ? (
          <p className="mt-2 text-sm text-zinc-500">
            Budget filter applied: under Rs{result.budgetMaxLakh.toFixed(2)} L
          </p>
        ) : null}

        <div className="mt-10 space-y-6">
          {result.matches.map((match, index) => (
            <article
              key={match.car.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 md:p-8"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-xs font-bold uppercase text-black">
                    #{index + 1} Technical Match
                  </span>
                  <h2 className="mt-4 text-3xl font-black">
                    {match.car.make} {match.car.model}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">{match.car.variant}</p>
                  <p className="mt-3 text-xl font-bold text-amber-400">
                    Rs{match.car.price_lakh.toFixed(2)} L
                  </p>
                </div>

                <div className="w-full max-w-xs">
                  <FitBar score={match.fitScore} />
                </div>
              </div>

              <div className="mt-7 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl bg-zinc-950 p-4">
                  <p className="text-xs text-zinc-500">Power</p>
                  <p className="mt-1 text-lg font-semibold">{match.car.power_bhp} bhp</p>
                </div>
                <div className="rounded-xl bg-zinc-950 p-4">
                  <p className="text-xs text-zinc-500">Acceleration</p>
                  <p className="mt-1 text-lg font-semibold">0-100 in {match.car.zero_to_100_sec}s</p>
                </div>
                <div className="rounded-xl bg-zinc-950 p-4">
                  <p className="text-xs text-zinc-500">Safety + ADAS</p>
                  <p className="mt-1 text-lg font-semibold">
                    {match.car.safety_rating_ncap ?? "N/A"} star · L{match.car.adas_level}
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-2">
                {match.technicalReasons.map((reason) => (
                  <li key={reason} className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
                    {reason}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">{match.car.fuel_type}</span>
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">{match.car.transmission}</span>
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">{match.car.body_type}</span>
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">{match.car.infotainment_size_inch}-inch screen</span>
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">OTA: {match.car.ota_updates ? "Yes" : "No"}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/technical"
            className="rounded-full bg-zinc-800 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-zinc-700"
          >
            Retake Technical Quiz
          </Link>
          <Link
            href="/"
            className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition-all duration-200 hover:border-zinc-500 hover:text-white"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
