export interface QuizOption {
  text: string;
  scores: Partial<Record<DimensionKey, number>>;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: QuizOption[];
}

export type DimensionKey =
  | "control"
  | "tech"
  | "status"
  | "signal"
  | "risk"
  | "future";

export interface DimensionScores {
  control: number;
  tech: number;
  status: number;
  signal: number;
  risk: number;
  future: number;
}

export interface Archetype {
  id: string;
  name: string;
  tagline: string;
  description: string;
  emoji: string;
  primaryDimensions: DimensionKey[];
}

export interface Car {
  id: number;
  make: string;
  model: string;
  variant: string;
  price_lakh: number;
  fuel_type: string;
  transmission: string;
  body_type: string;
  engine_cc: number | null;
  power_bhp: number;
  torque_nm: number;
  zero_to_100_sec: number;
  top_speed_kmph: number;
  suspension_type: string;
  steering_type: string;
  ride_quality: string;
  adas_level: number;
  infotainment_size_inch: number;
  ota_updates: boolean;
  safety_rating_ncap: number | null;
  noise_level: string;
  seat_comfort: string;
  range_km: number | null;
  fast_charge_support: boolean;
  design_language: string;
  exclusivity_score: number;
  score_control: number;
  score_tech: number;
  score_status: number;
  score_signal: number;
  score_risk: number;
  score_future: number;
  tagline: string;
  summary: string;
}

export interface CarMatch {
  car: Car;
  fitScore: number;
  convictionSentence: string;
  dimensionBreakdown: {
    dimension: DimensionKey;
    userScore: number;
    carScore: number;
    specEvidence: string;
  }[];
}

export interface QuizResult {
  archetype: Archetype;
  dimensionScores: DimensionScores;
  matches: CarMatch[];
}

export interface TechnicalQuizOption {
  text: string;
}

export interface TechnicalQuizQuestion {
  id: number;
  text: string;
  options: TechnicalQuizOption[];
}

export interface TechnicalCarMatch {
  car: Car;
  fitScore: number;
  technicalReasons: string[];
}

export interface TechnicalResult {
  budgetMaxLakh: number | null;
  matches: TechnicalCarMatch[];
}
