import {
  type DimensionKey,
  type DimensionScores,
  type QuizQuestion,
} from "@/types";

const DIMENSION_KEYS: DimensionKey[] = [
  "control",
  "tech",
  "status",
  "signal",
  "risk",
  "future",
];

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "You're stuck in slow city traffic for 45 minutes. What would make you feel better?",
    options: [
      {
        text: "A taut, responsive car - even rare bursts of acceleration feel rewarding",
        scores: { control: 2, risk: 1 },
      },
      {
        text: "A quiet, floaty ride and a good sound system - make the wait disappear",
        scores: { control: -2, signal: -1 },
      },
      {
        text: "Adaptive cruise + lane assist doing the work for me",
        scores: { tech: 2, control: -1 },
      },
      {
        text: "I'd rather not be driving at all - I want to be doing something else",
        scores: { tech: 3, future: 2 },
      },
    ],
  },
  {
    id: 2,
    text: "Your neighbour buys the exact same car as you, same colour. How do you feel?",
    options: [
      {
        text: "Genuinely annoyed - I wanted something unique",
        scores: { status: 3, signal: 3 },
      },
      {
        text: "Slightly bothered but I'll get over it",
        scores: { status: 1, signal: 1 },
      },
      {
        text: "Fine - it means I made a smart, popular choice",
        scores: { status: -1 },
      },
      {
        text: "I'd take it as a compliment - I have good taste",
        scores: { status: 2, signal: 1 },
      },
    ],
  },
  {
    id: 3,
    text: "There's a gap in traffic - just barely big enough. You're in a car you don't own. Do you go for it?",
    options: [
      {
        text: "Yes, immediately - I've already calculated it",
        scores: { risk: 3, control: 2 },
      },
      { text: "Probably yes, after a half-second check", scores: { risk: 2 } },
      { text: "I'd wait for a more comfortable gap", scores: { risk: -1 } },
      {
        text: "No - not worth the stress even if it's safe",
        scores: { risk: -3, control: -1 },
      },
    ],
  },
  {
    id: 4,
    text: "Your car's infotainment system crashes mid-drive. Your reaction?",
    options: [
      {
        text: "Unacceptable - software reliability is non-negotiable for me",
        scores: { tech: 3 },
      },
      {
        text: "Mildly annoying - I'd want a fix but it's not the end of the world",
        scores: { tech: 1 },
      },
      { text: "Whatever - I barely use it anyway", scores: { tech: -2 } },
      {
        text: "This is why I prefer physical buttons and knobs",
        scores: { tech: -3, future: -2 },
      },
    ],
  },
  {
    id: 5,
    text: "You're parking in a busy mall. Which feeling do you prefer?",
    options: [
      {
        text: "Heads turning as I pull in - I want people to notice",
        scores: { signal: 3, status: 2 },
      },
      {
        text: "A car that looks good but doesn't scream for attention",
        scores: { signal: 1, status: 1 },
      },
      {
        text: "Something practical that fits easily - I just need to park",
        scores: { signal: -2, status: -1 },
      },
      {
        text: "Ideally something so understated nobody gives it a second look",
        scores: { signal: -3 },
      },
    ],
  },
  {
    id: 6,
    text: "An EV with 380km range is Rs3L cheaper than its petrol equivalent. Your city has 5 fast chargers. Do you switch?",
    options: [
      {
        text: "Yes immediately - the savings and technology are compelling",
        scores: { future: 3, tech: 2 },
      },
      {
        text: "Probably yes after some research",
        scores: { future: 2, tech: 1 },
      },
      {
        text: "Maybe in a few years when the infrastructure improves",
        scores: { future: -1 },
      },
      {
        text: "No - I'll wait until EVs are fully mainstream and proven",
        scores: { future: -3, risk: -2 },
      },
    ],
  },
  {
    id: 7,
    text: "On a long highway drive, you drop into manual mode and hold a gear through a sweeping bend. How does that feel?",
    options: [
      {
        text: "Like the whole point of driving - I live for this",
        scores: { control: 3, risk: 2 },
      },
      {
        text: "Fun occasionally, but I'd let the car handle it most of the time",
        scores: { control: 1 },
      },
      { text: "I never use manual mode - why would I?", scores: { control: -2 } },
      {
        text: "I'd rather the car be doing this for me so I can relax",
        scores: { control: -3, tech: 1 },
      },
    ],
  },
  {
    id: 8,
    text: "You're choosing between two identical cars. One has a prestigious badge, one is unbranded but mechanically superior. Same price.",
    options: [
      {
        text: "The badge - it says something about who I am",
        scores: { status: 3, signal: 2 },
      },
      {
        text: "Probably the badge - perception matters even if I don't want it to",
        scores: { status: 2 },
      },
      {
        text: "The unbranded one - I don't care what others think about my car",
        scores: { status: -2 },
      },
      {
        text: "Definitely the superior one - I'm buying a machine, not an image",
        scores: { status: -3, tech: 1 },
      },
    ],
  },
  {
    id: 9,
    text: "You're buying a used car. Which would concern you more?",
    options: [
      {
        text: "It's boring to drive and has no soul",
        scores: { control: 2, risk: 1, signal: 1 },
      },
      {
        text: "The infotainment is outdated and can't be updated",
        scores: { tech: 2, future: 1 },
      },
      {
        text: "It has a lower safety rating than I expected",
        scores: { risk: -2 },
      },
      {
        text: "It's a common model - too many on the road",
        scores: { status: 2, signal: 2 },
      },
    ],
  },
  {
    id: 10,
    text: "Your dream car upgrade arrives. You test drive it. The ride is firm, the steering is sharp, the cabin is loud at speed. You:",
    options: [
      {
        text: "Love it - this is how a car should feel",
        scores: { control: 3, risk: 2 },
      },
      {
        text: "Appreciate it but wonder if I'll regret it on daily commutes",
        scores: { control: 1 },
      },
      {
        text: "It's not for me - I want my car to cocoon me",
        scores: { control: -2 },
      },
      {
        text: "Deal-breaker - comfort is non-negotiable for me",
        scores: { control: -3 },
      },
    ],
  },
  {
    id: 11,
    text: "A car subscription service lets you swap cars monthly - different model each time. Do you sign up?",
    options: [
      {
        text: "Yes instantly - variety is the point",
        scores: { future: 2, risk: 2, signal: 1 },
      },
      {
        text: "Interesting - I'd try it for a year",
        scores: { future: 1, risk: 1 },
      },
      {
        text: "Probably not - I want to own my car and know it well",
        scores: { future: -1 },
      },
      {
        text: "No - I want reliability and routine, not surprises",
        scores: { future: -2, risk: -2 },
      },
    ],
  },
  {
    id: 12,
    text: "You're describing your new car to a friend. Which sentence would make you proudest to say?",
    options: [
      {
        text: "'It does 0-100 in 6.2 seconds and the handling is surgical'",
        scores: { control: 3, risk: 2, signal: 2 },
      },
      {
        text: "'It practically drives itself and the software is incredible'",
        scores: { tech: 3, future: 2 },
      },
      {
        text: "'It's incredibly practical - fits the whole family and costs almost nothing to run'",
        scores: { status: -1, tech: 1 },
      },
      {
        text: "'Everyone stops to ask me what it is - it's a head-turner'",
        scores: { signal: 3, status: 3 },
      },
    ],
  },
];

const EMPTY_SCORES: DimensionScores = {
  control: 0,
  tech: 0,
  status: 0,
  signal: 0,
  risk: 0,
  future: 0,
};

function getTheoreticalBounds(): {
  min: Record<DimensionKey, number>;
  max: Record<DimensionKey, number>;
} {
  const min: Record<DimensionKey, number> = {
    control: 0,
    tech: 0,
    status: 0,
    signal: 0,
    risk: 0,
    future: 0,
  };
  const max: Record<DimensionKey, number> = {
    control: 0,
    tech: 0,
    status: 0,
    signal: 0,
    risk: 0,
    future: 0,
  };

  for (const question of QUESTIONS) {
    for (const dim of DIMENSION_KEYS) {
      let qMin = Number.POSITIVE_INFINITY;
      let qMax = Number.NEGATIVE_INFINITY;

      for (const option of question.options) {
        const value = option.scores[dim] ?? 0;
        qMin = Math.min(qMin, value);
        qMax = Math.max(qMax, value);
      }

      min[dim] += qMin;
      max[dim] += qMax;
    }
  }

  return { min, max };
}

function clamp(value: number, low: number, high: number): number {
  return Math.max(low, Math.min(high, value));
}

export function computeDimensionScores(answers: number[]): DimensionScores {
  if (!Array.isArray(answers) || answers.length !== QUESTIONS.length) {
    throw new Error(`Expected ${QUESTIONS.length} answers.`);
  }

  const raw: DimensionScores = { ...EMPTY_SCORES };

  answers.forEach((answerIndex, questionIndex) => {
    const question = QUESTIONS[questionIndex];
    if (!Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex > 3) {
      throw new Error(`Answer at position ${questionIndex + 1} must be between 0 and 3.`);
    }

    const selected = question.options[answerIndex];
    for (const dim of DIMENSION_KEYS) {
      raw[dim] += selected.scores[dim] ?? 0;
    }
  });

  const { min, max } = getTheoreticalBounds();
  const normalized: DimensionScores = { ...EMPTY_SCORES };

  for (const dim of DIMENSION_KEYS) {
    const denominator = max[dim] - min[dim];
    if (denominator <= 0) {
      normalized[dim] = 5;
      continue;
    }

    const scaled = ((raw[dim] - min[dim]) / denominator) * 10;
    normalized[dim] = Number(clamp(scaled, 0, 10).toFixed(2));
  }

  return normalized;
}

export const DIMENSIONS: DimensionKey[] = DIMENSION_KEYS;
