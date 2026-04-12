"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getArchetypeTeasers } from "@/lib/archetypes";

export default function HomePage() {
  const router = useRouter();
  const teasers = getArchetypeTeasers();
  const budgetSteps = [10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70];
  const [selectedBudget, setSelectedBudget] = useState(30);

  useEffect(() => {
    const saved = Number(sessionStorage.getItem("driverDNA_budget_max"));
    if (Number.isFinite(saved) && saved > 0) {
      setSelectedBudget(saved);
    }
  }, []);

  const handleBudgetSelect = (budget: number) => {
    setSelectedBudget(budget);
    sessionStorage.setItem("driverDNA_budget_max", String(budget));
  };

  const goToPersonalityQuiz = () => {
    sessionStorage.setItem("driverDNA_budget_max", String(selectedBudget));
    router.push(`/quiz?budget=${selectedBudget}`);
  };

  const goToTechnicalQuiz = () => {
    sessionStorage.setItem("driverDNA_budget_max", String(selectedBudget));
    router.push(`/technical?budget=${selectedBudget}`);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="driverdna-grid absolute inset-0 opacity-40" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-amber-400/10 to-transparent" />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
          What kind of driver are you?
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
          12 questions. No fluff. Just the car you actually need.
        </p>

        <div className="mt-8 w-full max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 md:p-5">
          <p className="text-sm font-semibold tracking-wide text-zinc-300">
            Set your max budget (in Rs lakh)
          </p>
          <div className="mt-3 overflow-x-auto pb-1">
            <div className="flex min-w-max gap-2">
              {budgetSteps.map((budget) => {
                const isActive = budget === selectedBudget;
                return (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => handleBudgetSelect(budget)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ease-in-out ${
                      isActive
                        ? "border-amber-400 bg-amber-400 text-black"
                        : "border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-amber-400 hover:text-white"
                    }`}
                  >
                    Under Rs{budget}L
                  </button>
                );
              })}
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Recommendations will prioritize cars priced up to Rs{selectedBudget.toFixed(2)} L.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={goToPersonalityQuiz}
            className="rounded-full bg-amber-400 px-8 py-4 text-lg font-bold text-black transition-all duration-200 ease-in-out hover:bg-amber-300"
          >
            Find My Car -&gt;
          </button>
          <button
            type="button"
            onClick={goToTechnicalQuiz}
            className="rounded-full border border-zinc-700 bg-zinc-900 px-8 py-4 text-lg font-bold text-zinc-100 transition-all duration-200 ease-in-out hover:border-amber-400 hover:text-amber-400"
          >
            Select Your Own Car
          </button>
        </div>

        <div className="mt-12 flex w-full max-w-5xl flex-wrap items-center justify-center gap-3">
          {teasers.map((archetype) => (
            <span
              key={archetype.id}
              className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400"
            >
              {archetype.emoji} {archetype.name}
            </span>
          ))}
        </div>

        <p className="mt-10 text-sm text-zinc-500">
          Powered by personality science + real specs
        </p>
      </section>
    </main>
  );
}
