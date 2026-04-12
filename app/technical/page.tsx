"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { getTechnicalQuestions } from "@/lib/technical";
import type { TechnicalResult } from "@/types";

const TECHNICAL_QUESTIONS = getTechnicalQuestions();
const OPTION_LABELS = ["A", "B", "C", "D"];
const LOADING_MESSAGES = [
  "Profiling your technical preferences...",
  "Scoring every car by hard specs...",
  "Building your engineer-grade shortlist...",
];

export default function TechnicalQuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    Array(TECHNICAL_QUESTIONS.length).fill(-1),
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [budgetMaxLakh, setBudgetMaxLakh] = useState<number | null>(null);

  const question = TECHNICAL_QUESTIONS[currentQuestion];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = Number(params.get("budget"));
    const fromStorage = Number(sessionStorage.getItem("driverDNA_budget_max"));
    const parsed = Number.isFinite(fromQuery) && fromQuery > 0
      ? fromQuery
      : Number.isFinite(fromStorage) && fromStorage > 0
        ? fromStorage
        : null;

    setBudgetMaxLakh(parsed);
    if (parsed) {
      sessionStorage.setItem("driverDNA_budget_max", String(parsed));
    }
  }, []);

  useEffect(() => {
    const existingAnswer = answers[currentQuestion];
    setSelectedOption(existingAnswer >= 0 ? existingAnswer : null);
  }, [answers, currentQuestion]);

  useEffect(() => {
    if (!isSubmitting) {
      return;
    }

    const interval = setInterval(() => {
      setLoadingMessageIndex((index) => (index + 1) % LOADING_MESSAGES.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isSubmitting]);

  const progressPercent = useMemo(
    () => ((currentQuestion + 1) / TECHNICAL_QUESTIONS.length) * 100,
    [currentQuestion],
  );

  const persistCurrentAnswer = (): number[] => {
    if (selectedOption === null) {
      return answers;
    }

    const next = [...answers];
    next[currentQuestion] = selectedOption;
    setAnswers(next);
    return next;
  };

  const goBack = () => {
    if (currentQuestion === 0) {
      return;
    }

    persistCurrentAnswer();
    setDirection("back");
    setCurrentQuestion((value) => value - 1);
  };

  const goNext = async () => {
    if (selectedOption === null) {
      return;
    }

    const finalAnswers = persistCurrentAnswer();

    if (currentQuestion < TECHNICAL_QUESTIONS.length - 1) {
      setDirection("forward");
      setCurrentQuestion((value) => value + 1);
      return;
    }

    setIsSubmitting(true);
    setLoadingMessageIndex(0);

    try {
      const response = await fetch("/api/technical/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: finalAnswers,
          budgetMaxLakh,
        }),
      });

      const payload = (await response.json()) as
        | TechnicalResult
        | { error: string };

      if (!response.ok) {
        throw new Error("error" in payload ? payload.error : "Failed request");
      }

      sessionStorage.setItem("driverDNA_technical_result", JSON.stringify(payload));
      router.push("/technical-results");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert(
        error instanceof Error
          ? error.message
          : "Technical recommendation failed. Please try again.",
      );
    }
  };

  return (
    <main className="relative min-h-screen bg-zinc-950 px-5 pb-10 pt-6 text-white md:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col">
        <div className="mb-8">
          <div className="h-1 w-full rounded-full bg-zinc-800">
            <div
              className="h-1 rounded-full bg-amber-400 transition-all duration-200 ease-in-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-zinc-500">
            <p>
              Question {currentQuestion + 1} of {TECHNICAL_QUESTIONS.length}
            </p>
            {budgetMaxLakh ? <p>Budget cap: Rs{budgetMaxLakh.toFixed(2)} L</p> : null}
          </div>
        </div>

        <section
          key={question.id}
          className={
            direction === "forward"
              ? "animate-slide-in-right"
              : "animate-slide-in-left"
          }
        >
          <h1 className="mx-auto max-w-2xl text-center text-2xl font-semibold leading-tight md:text-3xl">
            {question.text}
          </h1>

          <div className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-4">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;

              return (
                <button
                  key={option.text}
                  type="button"
                  onClick={() => setSelectedOption(index)}
                  className={`group flex w-full items-start gap-4 rounded-xl border p-5 text-left transition-all duration-200 ease-in-out ${
                    isSelected
                      ? "border-amber-400 bg-amber-400/10 text-white"
                      : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-amber-400"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      isSelected
                        ? "bg-amber-400 text-black"
                        : "bg-zinc-700 text-zinc-200"
                    }`}
                  >
                    {OPTION_LABELS[index]}
                  </span>
                  <span className="text-base leading-relaxed">{option.text}</span>
                </button>
              );
            })}
          </div>
        </section>

        <div className="mx-auto mt-10 flex w-full max-w-3xl items-center justify-between">
          {currentQuestion > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-all duration-200 ease-in-out hover:border-zinc-500 hover:text-white"
            >
              &lt;- Back
            </button>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={goNext}
            disabled={selectedOption === null || isSubmitting}
            className="rounded-full bg-amber-400 px-8 py-3 text-sm font-bold text-black transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
          >
            {currentQuestion === TECHNICAL_QUESTIONS.length - 1
              ? "See Technical Matches ->"
              : "Next ->"}
          </button>
        </div>
      </div>

      {isSubmitting ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-950/95 px-6">
          <div className="text-center">
            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-amber-400" />
            <p className="text-xl font-semibold text-white md:text-2xl">
              {LOADING_MESSAGES[loadingMessageIndex]}
            </p>
          </div>
        </div>
      ) : null}
    </main>
  );
}
