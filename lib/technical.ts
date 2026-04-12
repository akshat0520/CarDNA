import type {
  Car,
  TechnicalQuizQuestion,
} from "@/types";

type RidePreference = "firm" | "comfort" | "balanced" | "commanding";

type TechnicalProfile = {
  preferredBodyTypes: string[];
  preferredFuelTypes: string[];
  transmissionPreference: "manual" | "automatic" | "any";
  minPowerBhp: number;
  targetZeroTo100: number | null;
  minSafetyRating: number;
  minAdasLevel: number;
  minInfotainmentInch: number;
  requireOta: boolean;
  minRangeKm: number | null;
  requireFastCharge: boolean;
  ridePreference: RidePreference;
};

type TechnicalOptionEffect = Partial<TechnicalProfile>;

type TechnicalQuestionDefinition = TechnicalQuizQuestion & {
  effects: TechnicalOptionEffect[];
};

const DEFAULT_PROFILE: TechnicalProfile = {
  preferredBodyTypes: [],
  preferredFuelTypes: [],
  transmissionPreference: "any",
  minPowerBhp: 100,
  targetZeroTo100: null,
  minSafetyRating: 0,
  minAdasLevel: 0,
  minInfotainmentInch: 8,
  requireOta: false,
  minRangeKm: null,
  requireFastCharge: false,
  ridePreference: "balanced",
};

export const TECHNICAL_QUESTIONS: TechnicalQuestionDefinition[] = [
  {
    id: 1,
    text: "Pick the body style you actually want to live with:",
    options: [
      { text: "Driver-focused sedan" },
      { text: "SUV or high-seating crossover" },
      { text: "Compact hatchback" },
      { text: "No strict body preference" },
    ],
    effects: [
      { preferredBodyTypes: ["Sedan"] },
      { preferredBodyTypes: ["SUV", "Crossover", "MPV"] },
      { preferredBodyTypes: ["Hatchback"] },
      { preferredBodyTypes: [] },
    ],
  },
  {
    id: 2,
    text: "What powertrain philosophy fits you best?",
    options: [
      { text: "Petrol or diesel performance" },
      { text: "Hybrid efficiency" },
      { text: "Pure EV only" },
      { text: "I am open to any fuel type" },
    ],
    effects: [
      { preferredFuelTypes: ["Petrol", "Diesel"] },
      { preferredFuelTypes: ["Hybrid"] },
      { preferredFuelTypes: ["Electric"], minRangeKm: 380, requireFastCharge: true },
      { preferredFuelTypes: [], minRangeKm: null },
    ],
  },
  {
    id: 3,
    text: "Transmission expectation:",
    options: [
      { text: "Involving setup: manual / DSG bias" },
      { text: "Automatic only" },
      { text: "Either works" },
      { text: "Automatic with comfort tuning" },
    ],
    effects: [
      { transmissionPreference: "manual" },
      { transmissionPreference: "automatic" },
      { transmissionPreference: "any" },
      { transmissionPreference: "automatic", ridePreference: "comfort" },
    ],
  },
  {
    id: 4,
    text: "Set your minimum power expectation:",
    options: [
      { text: "100+ bhp is enough" },
      { text: "140+ bhp" },
      { text: "170+ bhp" },
      { text: "220+ bhp" },
    ],
    effects: [
      { minPowerBhp: 100 },
      { minPowerBhp: 140 },
      { minPowerBhp: 170 },
      { minPowerBhp: 220 },
    ],
  },
  {
    id: 5,
    text: "Acceleration target (0-100 km/h):",
    options: [
      { text: "Under 7 seconds" },
      { text: "Under 9 seconds" },
      { text: "Under 11 seconds" },
      { text: "No acceleration target" },
    ],
    effects: [
      { targetZeroTo100: 7, ridePreference: "firm" },
      { targetZeroTo100: 9 },
      { targetZeroTo100: 11 },
      { targetZeroTo100: null, ridePreference: "comfort" },
    ],
  },
  {
    id: 6,
    text: "Safety and driver-assist baseline:",
    options: [
      { text: "Strict: 5-star safety + ADAS L2+" },
      { text: "At least 5-star safety" },
      { text: "At least ADAS L1" },
      { text: "No strict baseline" },
    ],
    effects: [
      { minSafetyRating: 5, minAdasLevel: 2 },
      { minSafetyRating: 5, minAdasLevel: 0 },
      { minSafetyRating: 0, minAdasLevel: 1 },
      { minSafetyRating: 0, minAdasLevel: 0 },
    ],
  },
  {
    id: 7,
    text: "Cabin tech expectations:",
    options: [
      { text: "Large screen (10-inch+) and ADAS-heavy cockpit" },
      { text: "OTA updates are non-negotiable" },
      { text: "Balanced tech is enough" },
      { text: "Basic infotainment is fine" },
    ],
    effects: [
      { minInfotainmentInch: 10, minAdasLevel: 2 },
      { requireOta: true, minInfotainmentInch: 10 },
      { minInfotainmentInch: 9 },
      { minInfotainmentInch: 7, requireOta: false },
    ],
  },
  {
    id: 8,
    text: "Ride and chassis feel:",
    options: [
      { text: "Firm and connected" },
      { text: "Plush and quiet" },
      { text: "Balanced all-rounder" },
      { text: "Commanding high-seating comfort" },
    ],
    effects: [
      { ridePreference: "firm" },
      { ridePreference: "comfort" },
      { ridePreference: "balanced" },
      { ridePreference: "commanding", preferredBodyTypes: ["SUV", "MPV", "Crossover"] },
    ],
  },
];

export function buildTechnicalProfile(answers: number[]): TechnicalProfile {
  if (answers.length !== TECHNICAL_QUESTIONS.length) {
    throw new Error(`Expected ${TECHNICAL_QUESTIONS.length} technical answers.`);
  }

  return answers.reduce<TechnicalProfile>((profile, answerIndex, questionIndex) => {
    const definition = TECHNICAL_QUESTIONS[questionIndex];
    const effect = definition.effects[answerIndex];

    if (!effect) {
      throw new Error(`Invalid answer index for technical question ${questionIndex + 1}.`);
    }

    return {
      ...profile,
      ...effect,
    };
  }, { ...DEFAULT_PROFILE });
}

function textIncludesAny(text: string, values: string[]): boolean {
  if (values.length === 0) {
    return true;
  }

  const lower = text.toLowerCase();
  return values.some((value) => lower.includes(value.toLowerCase()));
}

function matchesTransmission(car: Car, preference: TechnicalProfile["transmissionPreference"]): boolean {
  if (preference === "any") {
    return true;
  }

  const t = car.transmission.toLowerCase();
  if (preference === "manual") {
    return t.includes("manual") || t.includes("dsg");
  }

  return t.includes("auto") || t.includes("cvt") || t.includes("dsg");
}

function rideMatchScore(car: Car, preference: RidePreference): number {
  const ride = car.ride_quality.toLowerCase();
  const body = car.body_type.toLowerCase();

  if (preference === "firm") {
    return ride.includes("firm") || ride.includes("sport") ? 1 : 0.4;
  }

  if (preference === "comfort") {
    return ride.includes("comfort") || ride.includes("smooth") || ride.includes("plush")
      ? 1
      : 0.45;
  }

  if (preference === "commanding") {
    return ride.includes("command") || body.includes("suv") || body.includes("mpv")
      ? 1
      : 0.35;
  }

  return ride.includes("balanced") || ride.includes("firm-comfortable") ? 1 : 0.7;
}

function valueRatio(value: number, target: number): number {
  if (target <= 0) {
    return 1;
  }
  return Math.max(0, Math.min(1, value / target));
}

function inverseValueRatio(value: number, maxTarget: number): number {
  if (maxTarget <= 0) {
    return 1;
  }
  return Math.max(0, Math.min(1, maxTarget / value));
}

export function computeTechnicalFitScore(car: Car, profile: TechnicalProfile): number {
  let score = 0;
  let maxScore = 0;

  const addWeighted = (weight: number, normalized: number) => {
    score += weight * Math.max(0, Math.min(1, normalized));
    maxScore += weight;
  };

  addWeighted(16, textIncludesAny(car.body_type, profile.preferredBodyTypes) ? 1 : 0);
  addWeighted(16, textIncludesAny(car.fuel_type, profile.preferredFuelTypes) ? 1 : 0);
  addWeighted(10, matchesTransmission(car, profile.transmissionPreference) ? 1 : 0.2);
  addWeighted(12, valueRatio(car.power_bhp, profile.minPowerBhp));
  addWeighted(
    10,
    profile.targetZeroTo100 ? inverseValueRatio(car.zero_to_100_sec, profile.targetZeroTo100) : 1,
  );

  const safety = car.safety_rating_ncap ?? 0;
  addWeighted(9, profile.minSafetyRating > 0 ? valueRatio(safety, profile.minSafetyRating) : 1);
  addWeighted(7, profile.minAdasLevel > 0 ? valueRatio(car.adas_level, profile.minAdasLevel) : 1);
  addWeighted(
    6,
    profile.minInfotainmentInch > 0
      ? valueRatio(car.infotainment_size_inch, profile.minInfotainmentInch)
      : 1,
  );
  addWeighted(5, profile.requireOta ? (car.ota_updates ? 1 : 0) : 1);

  const rangeRatio =
    profile.minRangeKm && profile.minRangeKm > 0
      ? valueRatio(car.range_km ?? 0, profile.minRangeKm)
      : 1;
  const fastChargeRatio = profile.requireFastCharge
    ? car.fast_charge_support
      ? 1
      : 0
    : 1;

  addWeighted(10, rangeRatio * 0.7 + fastChargeRatio * 0.3);
  addWeighted(9, rideMatchScore(car, profile.ridePreference));

  if (maxScore === 0) {
    return 0;
  }

  return Number(((score / maxScore) * 100).toFixed(2));
}

export function buildTechnicalReasons(car: Car, profile: TechnicalProfile): string[] {
  const reasons: string[] = [];

  if (profile.minPowerBhp >= 140 || (profile.targetZeroTo100 ?? 99) <= 9) {
    reasons.push(
      `${car.power_bhp} bhp with 0-100 in ${car.zero_to_100_sec}s delivers the performance window you asked for.`,
    );
  }

  if (profile.minSafetyRating > 0 || profile.minAdasLevel > 0) {
    reasons.push(
      `Safety ${car.safety_rating_ncap ?? "N/A"} and ADAS level ${car.adas_level} align with your protection and driver-assist baseline.`,
    );
  }

  if (
    textIncludesAny(car.fuel_type, profile.preferredFuelTypes) ||
    profile.minRangeKm !== null ||
    profile.requireFastCharge
  ) {
    reasons.push(
      `${car.fuel_type}${car.range_km ? ` with ${car.range_km} km range` : ""} matches your powertrain preference.`,
    );
  }

  if (profile.minInfotainmentInch >= 10 || profile.requireOta) {
    reasons.push(
      `${car.infotainment_size_inch}-inch infotainment${car.ota_updates ? " with OTA support" : " without OTA"} maps to your cabin-tech expectation.`,
    );
  }

  if (profile.ridePreference !== "balanced") {
    reasons.push(
      `${car.ride_quality} ride with ${car.suspension_type} fits your requested chassis feel.`,
    );
  }

  reasons.push(
    `${car.body_type} form factor, ${car.transmission}, and ${car.top_speed_kmph} km/h top speed make it a practical technical fit.`,
  );

  return reasons.slice(0, 3);
}

export function getTechnicalQuestions(): TechnicalQuizQuestion[] {
  return TECHNICAL_QUESTIONS.map(({ id, text, options }) => ({
    id,
    text,
    options,
  }));
}
