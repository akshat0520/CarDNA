import type Database from "better-sqlite3";

type CarSeedRow = {
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
  ota_updates: number;
  safety_rating_ncap: number | null;
  noise_level: string;
  seat_comfort: string;
  range_km: number | null;
  fast_charge_support: number;
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
};

export const CAR_SEED_DATA: CarSeedRow[] = [
  {
    make: "Hyundai",
    model: "i20 N Line",
    variant: "N8 1.0 Turbo",
    price_lakh: 13.5,
    fuel_type: "Petrol",
    transmission: "Manual",
    body_type: "Hatchback",
    engine_cc: 998,
    power_bhp: 118,
    torque_nm: 172,
    zero_to_100_sec: 9.8,
    top_speed_kmph: 185,
    suspension_type: "Sport-tuned McPherson",
    steering_type: "R-EPS",
    ride_quality: "Firm",
    adas_level: 1,
    infotainment_size_inch: 10.25,
    ota_updates: 0,
    safety_rating_ncap: 3,
    noise_level: "Moderate",
    seat_comfort: "Sporty bolstered",
    range_km: null,
    fast_charge_support: 0,
    design_language: "Aggressive sporty",
    exclusivity_score: 6,
    score_control: 9,
    score_tech: 5,
    score_status: 6,
    score_signal: 7,
    score_risk: 8,
    score_future: 3,
    tagline: "Sharp, raw, unapologetically fun.",
    summary:
      "The i20 N Line is built for drivers who want to feel every corner. Its sport-tuned suspension and 120PS turbo engine reward precise inputs and punish laziness. Not a car for passive passengers.",
  },
  {
    make: "Tata",
    model: "Nexon EV Max",
    variant: "XZ+ Lux",
    price_lakh: 19.5,
    fuel_type: "Electric",
    transmission: "Automatic",
    body_type: "SUV",
    engine_cc: null,
    power_bhp: 143,
    torque_nm: 250,
    zero_to_100_sec: 8.9,
    top_speed_kmph: 150,
    suspension_type: "McPherson + Twist beam",
    steering_type: "EPS",
    ride_quality: "Comfortable",
    adas_level: 2,
    infotainment_size_inch: 10.25,
    ota_updates: 1,
    safety_rating_ncap: 5,
    noise_level: "Very quiet (EV)",
    seat_comfort: "Premium",
    range_km: 437,
    fast_charge_support: 1,
    design_language: "Bold futuristic",
    exclusivity_score: 5,
    score_control: 5,
    score_tech: 9,
    score_status: 6,
    score_signal: 6,
    score_risk: 4,
    score_future: 10,
    tagline: "The future, delivered today.",
    summary:
      "Nexon EV Max leads with technology and sustainability. OTA updates, ADAS level 2, 437km range and instant torque make it the most tech-forward mass-market car in India.",
  },
  {
    make: "Mercedes-Benz",
    model: "C-Class",
    variant: "C200",
    price_lakh: 57,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "Sedan",
    engine_cc: 1496,
    power_bhp: 204,
    torque_nm: 300,
    zero_to_100_sec: 7.3,
    top_speed_kmph: 240,
    suspension_type: "4-link rear multilink",
    steering_type: "Electromechanical",
    ride_quality: "Plush",
    adas_level: 3,
    infotainment_size_inch: 11.9,
    ota_updates: 1,
    safety_rating_ncap: 5,
    noise_level: "Very quiet",
    seat_comfort: "Luxury",
    range_km: null,
    fast_charge_support: 0,
    design_language: "Understated luxury",
    exclusivity_score: 9,
    score_control: 7,
    score_tech: 8,
    score_status: 10,
    score_signal: 8,
    score_risk: 5,
    score_future: 7,
    tagline: "Status whispered, never shouted.",
    summary:
      "The C-Class carries weight silently. Its MBUX system, acoustic glass, and prestige badge deliver what no spec sheet fully captures: the quiet confidence of arriving in a Mercedes.",
  },
  {
    make: "Maruti Suzuki",
    model: "Jimny",
    variant: "Alpha",
    price_lakh: 12.74,
    fuel_type: "Petrol",
    transmission: "Manual/Auto",
    body_type: "SUV",
    engine_cc: 1462,
    power_bhp: 103,
    torque_nm: 134,
    zero_to_100_sec: 13,
    top_speed_kmph: 150,
    suspension_type: "3-link rigid axle (both)",
    steering_type: "EPS",
    ride_quality: "Off-road biased",
    adas_level: 0,
    infotainment_size_inch: 9,
    ota_updates: 0,
    safety_rating_ncap: 3,
    noise_level: "Moderate",
    seat_comfort: "Utilitarian",
    range_km: null,
    fast_charge_support: 0,
    design_language: "Iconic retro-utilitarian",
    exclusivity_score: 8,
    score_control: 7,
    score_tech: 2,
    score_status: 5,
    score_signal: 9,
    score_risk: 8,
    score_future: 2,
    tagline: "An icon on four wheels. Rare, raw, recognisable.",
    summary:
      "The Jimny is a head-turner for the right reasons. Its boxy retro silhouette and genuine 4WD capability make it a statement of individuality. Not fast, not tech-heavy: just pure character.",
  },
  {
    make: "Honda",
    model: "City Hybrid",
    variant: "ZX e:HEV",
    price_lakh: 19.5,
    fuel_type: "Petrol Hybrid",
    transmission: "e-CVT",
    body_type: "Sedan",
    engine_cc: 1498,
    power_bhp: 126,
    torque_nm: 253,
    zero_to_100_sec: 10.5,
    top_speed_kmph: 175,
    suspension_type: "MacPherson + Torsion beam",
    steering_type: "EPS",
    ride_quality: "Smooth",
    adas_level: 1,
    infotainment_size_inch: 8,
    ota_updates: 0,
    safety_rating_ncap: 2,
    noise_level: "Quiet",
    seat_comfort: "Comfortable",
    range_km: null,
    fast_charge_support: 0,
    design_language: "Refined conservative",
    exclusivity_score: 4,
    score_control: 4,
    score_tech: 6,
    score_status: 5,
    score_signal: 3,
    score_risk: 2,
    score_future: 7,
    tagline: "Brilliantly efficient. Effortlessly sensible.",
    summary:
      "The City Hybrid's dual-motor self-charging system returns 26+ kmpl in city traffic. For the driver who values intelligence over impression, it is the smartest purchase in its segment.",
  },
  {
    make: "Kia",
    model: "EV6",
    variant: "GT-Line",
    price_lakh: 65,
    fuel_type: "Electric",
    transmission: "Automatic",
    body_type: "Crossover",
    engine_cc: null,
    power_bhp: 229,
    torque_nm: 350,
    zero_to_100_sec: 5.1,
    top_speed_kmph: 185,
    suspension_type: "MacPherson + Multi-link",
    steering_type: "MDPS",
    ride_quality: "Sport-comfort",
    adas_level: 3,
    infotainment_size_inch: 12.3,
    ota_updates: 1,
    safety_rating_ncap: 5,
    noise_level: "Quiet",
    seat_comfort: "Premium sport",
    range_km: 528,
    fast_charge_support: 1,
    design_language: "Futuristic bold",
    exclusivity_score: 9,
    score_control: 8,
    score_tech: 10,
    score_status: 9,
    score_signal: 10,
    score_risk: 7,
    score_future: 10,
    tagline: "0-100 in 5.1s. Charged in 18 minutes. Heads turned always.",
    summary:
      "The EV6 GT-Line is the car that does not compromise. 800V ultra-fast charging, 528km range, 229bhp, and a design that makes petrol cars look dated. It is the synthesis of every dimension.",
  },
  {
    make: "Volkswagen",
    model: "Virtus",
    variant: "GT DSG",
    price_lakh: 16.5,
    fuel_type: "Petrol",
    transmission: "DSG (7-speed)",
    body_type: "Sedan",
    engine_cc: 1498,
    power_bhp: 150,
    torque_nm: 250,
    zero_to_100_sec: 8.4,
    top_speed_kmph: 210,
    suspension_type: "MacPherson + Twist beam",
    steering_type: "EPS",
    ride_quality: "Firm-comfortable",
    adas_level: 1,
    infotainment_size_inch: 10,
    ota_updates: 0,
    safety_rating_ncap: 5,
    noise_level: "Low",
    seat_comfort: "Sport",
    range_km: null,
    fast_charge_support: 0,
    design_language: "European understated",
    exclusivity_score: 7,
    score_control: 8,
    score_tech: 6,
    score_status: 7,
    score_signal: 6,
    score_risk: 7,
    score_future: 4,
    tagline: "150PS. DSG. The most driver's sedan in its class.",
    summary:
      "The Virtus GT's 1.5 TSI and DSG gearbox deliver mechanical precision rare in Indian mass-market sedans. Paddle shifters, 210kmph top speed, and a 5-star safety rating make it a driver's tool masquerading as an executive sedan.",
  },
  {
    make: "Mahindra",
    model: "Scorpio-N",
    variant: "Z8L",
    price_lakh: 24,
    fuel_type: "Diesel",
    transmission: "Automatic",
    body_type: "SUV",
    engine_cc: 2184,
    power_bhp: 175,
    torque_nm: 400,
    zero_to_100_sec: 10.2,
    top_speed_kmph: 180,
    suspension_type: "Double wishbone + Multi-link",
    steering_type: "EPS",
    ride_quality: "SUV commanding",
    adas_level: 1,
    infotainment_size_inch: 8,
    ota_updates: 0,
    safety_rating_ncap: 5,
    noise_level: "Moderate diesel",
    seat_comfort: "Commanding, captain seats",
    range_km: null,
    fast_charge_support: 0,
    design_language: "Bold commanding masculine",
    exclusivity_score: 7,
    score_control: 6,
    score_tech: 4,
    score_status: 8,
    score_signal: 8,
    score_risk: 5,
    score_future: 3,
    tagline: "400Nm of presence. Every road feels like yours.",
    summary:
      "The Scorpio-N commands attention through sheer presence. Its 5-star NCAP score and 400Nm diesel torque answer both safety sceptics and highway cruisers. It does not ask for road space: it owns it.",
  },
  {
    make: "Toyota",
    model: "Innova HyCross",
    variant: "GX(O) Hybrid",
    price_lakh: 28,
    fuel_type: "Petrol Hybrid",
    transmission: "e-CVT",
    body_type: "MPV",
    engine_cc: 1987,
    power_bhp: 186,
    torque_nm: 206,
    zero_to_100_sec: 10,
    top_speed_kmph: 170,
    suspension_type: "Double wishbone front",
    steering_type: "EPS",
    ride_quality: "Premium comfortable",
    adas_level: 1,
    infotainment_size_inch: 10.1,
    ota_updates: 0,
    safety_rating_ncap: null,
    noise_level: "Very quiet",
    seat_comfort: "Premium lounge",
    range_km: null,
    fast_charge_support: 0,
    design_language: "Premium understated MPV",
    exclusivity_score: 6,
    score_control: 3,
    score_tech: 7,
    score_status: 7,
    score_signal: 4,
    score_risk: 1,
    score_future: 7,
    tagline: "Toyota reliability. Hybrid silence. Family luxury.",
    summary:
      "The HyCross Hybrid moves 7 people in near-silence. Its self-charging hybrid delivers 23+ kmpl and a floaty, cocooning ride that makes long drives effortless. Chosen by those who prioritise time, comfort and reliability over performance.",
  },
  {
    make: "Hyundai",
    model: "Ioniq 6",
    variant: "Standard Range",
    price_lakh: 44,
    fuel_type: "Electric",
    transmission: "Automatic",
    body_type: "Sedan",
    engine_cc: null,
    power_bhp: 149,
    torque_nm: 235,
    zero_to_100_sec: 8.6,
    top_speed_kmph: 185,
    suspension_type: "MacPherson + Multi-link",
    steering_type: "MDPS",
    ride_quality: "Smooth",
    adas_level: 3,
    infotainment_size_inch: 12,
    ota_updates: 1,
    safety_rating_ncap: 5,
    noise_level: "Very quiet",
    seat_comfort: "Ergonomic award-winning",
    range_km: 385,
    fast_charge_support: 1,
    design_language: "Aerodynamic futuristic",
    exclusivity_score: 8,
    score_control: 5,
    score_tech: 10,
    score_status: 8,
    score_signal: 9,
    score_risk: 3,
    score_future: 10,
    tagline: "A spaceship for the daily commute.",
    summary:
      "World Car of the Year 2023. The Ioniq 6's drag coefficient of 0.21 and 800V architecture represent automotive engineering at its finest. Its cabin, rated best-in-class for ergonomics, is a daily reward.",
  },
  {
    make: "Jeep",
    model: "Compass",
    variant: "Trailhawk",
    price_lakh: 29.5,
    fuel_type: "Diesel",
    transmission: "9-speed Automatic",
    body_type: "SUV",
    engine_cc: 1956,
    power_bhp: 170,
    torque_nm: 350,
    zero_to_100_sec: 9.5,
    top_speed_kmph: 195,
    suspension_type: "MacPherson + Multi-link",
    steering_type: "EPS",
    ride_quality: "Balanced",
    adas_level: 2,
    infotainment_size_inch: 10.1,
    ota_updates: 0,
    safety_rating_ncap: null,
    noise_level: "Low",
    seat_comfort: "Premium",
    range_km: null,
    fast_charge_support: 0,
    design_language: "Rugged premium",
    exclusivity_score: 8,
    score_control: 7,
    score_tech: 6,
    score_status: 9,
    score_signal: 9,
    score_risk: 7,
    score_future: 4,
    tagline: "Badge prestige that earns its off-road credentials.",
    summary:
      "The Compass Trailhawk is rare: a premium badge with genuine 4x4 Trail Rated capability. For drivers who want Jeep prestige without sacrificing ability, it performs everywhere you would dare take it.",
  },
  {
    make: "Skoda",
    model: "Slavia",
    variant: "1.5 TSI AT",
    price_lakh: 17.5,
    fuel_type: "Petrol",
    transmission: "DSG (7-speed)",
    body_type: "Sedan",
    engine_cc: 1498,
    power_bhp: 150,
    torque_nm: 250,
    zero_to_100_sec: 8.5,
    top_speed_kmph: 210,
    suspension_type: "MacPherson + Twist beam",
    steering_type: "EPS",
    ride_quality: "European firm",
    adas_level: 0,
    infotainment_size_inch: 10,
    ota_updates: 0,
    safety_rating_ncap: 5,
    noise_level: "Low",
    seat_comfort: "Comfortable",
    range_km: null,
    fast_charge_support: 0,
    design_language: "European understated premium",
    exclusivity_score: 7,
    score_control: 8,
    score_tech: 5,
    score_status: 7,
    score_signal: 6,
    score_risk: 6,
    score_future: 3,
    tagline: "Czech engineering. No compromises.",
    summary:
      "The Slavia 1.5 TSI combines European chassis tuning with a punchy DSG powertrain. Its 5-star safety rating and precise handling are bought for Rs17.5L - a level of mechanical integrity that money usually cannot buy at this price.",
  },
];

export function seedCars(database: Database.Database, force = false): number {
  if (force) {
    database.prepare("DELETE FROM cars").run();
  }

  const existingCount =
    (database.prepare("SELECT COUNT(*) as count FROM cars").get() as {
      count: number;
    }).count ?? 0;

  if (existingCount > 0) {
    return 0;
  }

  const insert = database.prepare(`
    INSERT INTO cars (
      make, model, variant, price_lakh, fuel_type, transmission, body_type,
      engine_cc, power_bhp, torque_nm, zero_to_100_sec, top_speed_kmph,
      suspension_type, steering_type, ride_quality,
      adas_level, infotainment_size_inch, ota_updates, safety_rating_ncap,
      noise_level, seat_comfort, range_km, fast_charge_support,
      design_language, exclusivity_score,
      score_control, score_tech, score_status, score_signal, score_risk, score_future,
      tagline, summary
    ) VALUES (
      @make, @model, @variant, @price_lakh, @fuel_type, @transmission, @body_type,
      @engine_cc, @power_bhp, @torque_nm, @zero_to_100_sec, @top_speed_kmph,
      @suspension_type, @steering_type, @ride_quality,
      @adas_level, @infotainment_size_inch, @ota_updates, @safety_rating_ncap,
      @noise_level, @seat_comfort, @range_km, @fast_charge_support,
      @design_language, @exclusivity_score,
      @score_control, @score_tech, @score_status, @score_signal, @score_risk, @score_future,
      @tagline, @summary
    )
  `);

  const insertMany = database.transaction((rows: CarSeedRow[]) => {
    for (const row of rows) {
      insert.run(row);
    }
  });

  insertMany(CAR_SEED_DATA);
  return CAR_SEED_DATA.length;
}

async function runAsScript(): Promise<void> {
  const { db } = await import("./db");
  const inserted = seedCars(db, true);
  console.log(`Seed complete. Inserted ${inserted} cars.`);
}

if (process.argv.some((arg) => arg.includes("seed.ts"))) {
  runAsScript().catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
}
