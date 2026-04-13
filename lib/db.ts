import path from "path";
import Database from "better-sqlite3";

import { seedCars } from "@/lib/seed";
import type { Car } from "@/types";

declare global {
  // eslint-disable-next-line no-var
  var __driverdna_db__: Database.Database | undefined;
}

const dbPath = process.env.VERCEL
  ? path.resolve("/tmp", "database.sqlite")
  : path.resolve(process.cwd(), "database.sqlite");
const db = global.__driverdna_db__ ?? new Database(dbPath);

if (process.env.NODE_ENV !== "production") {
  global.__driverdna_db__ = db;
}

function initializeDB(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS cars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      make TEXT NOT NULL,
      model TEXT NOT NULL,
      variant TEXT NOT NULL,
      price_lakh REAL NOT NULL,
      fuel_type TEXT NOT NULL,
      transmission TEXT NOT NULL,
      body_type TEXT NOT NULL,
      -- Performance
      engine_cc INTEGER,
      power_bhp REAL,
      torque_nm REAL,
      zero_to_100_sec REAL,
      top_speed_kmph INTEGER,
      -- Ride & Handling
      suspension_type TEXT,
      steering_type TEXT,
      ride_quality TEXT,
      -- Tech & Safety
      adas_level INTEGER,
      infotainment_size_inch REAL,
      ota_updates INTEGER,
      safety_rating_ncap INTEGER,
      -- Comfort & NVH
      noise_level TEXT,
      seat_comfort TEXT,
      -- EV specific
      range_km INTEGER,
      fast_charge_support INTEGER,
      -- Status & Design
      design_language TEXT,
      exclusivity_score INTEGER,
      -- Personality dimension fit scores (precomputed, 1-10)
      score_control INTEGER,
      score_tech INTEGER,
      score_status INTEGER,
      score_signal INTEGER,
      score_risk INTEGER,
      score_future INTEGER,
      -- Overview
      tagline TEXT,
      summary TEXT
    );

    CREATE TABLE IF NOT EXISTS quiz_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      answers TEXT NOT NULL,
      dimension_scores TEXT NOT NULL,
      archetype TEXT NOT NULL,
      recommended_cars TEXT NOT NULL
    );
  `);

  const row = db.prepare("SELECT COUNT(*) as count FROM cars").get() as {
    count: number;
  };

  if ((row?.count ?? 0) === 0) {
    seedCars(db);
  }
}

initializeDB();

type CarRow = Omit<Car, "ota_updates" | "fast_charge_support"> & {
  ota_updates: number;
  fast_charge_support: number;
};

function mapRowToCar(row: CarRow): Car {
  return {
    ...row,
    ota_updates: Boolean(row.ota_updates),
    fast_charge_support: Boolean(row.fast_charge_support),
  };
}

export function getAllCars(): Car[] {
  const rows = db.prepare("SELECT * FROM cars").all() as CarRow[];
  return rows.map(mapRowToCar);
}

export function ensureDatabaseSeeded(force = false): number {
  return seedCars(db, force);
}

export { db };
