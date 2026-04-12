import { NextResponse } from "next/server";

import { ensureDatabaseSeeded } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  try {
    const inserted = ensureDatabaseSeeded(false);

    return NextResponse.json({
      ok: true,
      inserted,
      message:
        inserted > 0
          ? `Seeded ${inserted} cars.`
          : "Cars table already contains data.",
    });
  } catch (error) {
    console.error("GET /api/seed failed:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to seed database." },
      { status: 500 },
    );
  }
}
