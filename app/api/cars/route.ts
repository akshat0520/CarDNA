import { NextResponse } from "next/server";

import { getAllCars } from "@/lib/db";
import type { Car } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse<Car[] | { error: string }>> {
  try {
    const cars = getAllCars();
    return NextResponse.json(cars);
  } catch (error) {
    console.error("GET /api/cars failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch cars." },
      { status: 500 },
    );
  }
}
