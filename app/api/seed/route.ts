import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { JerseyModel } from "@/models/Jersey";
import { MOCK_JERSEYS } from "@/lib/mock-jerseys";

/**
 * Initial seeding: insert current MOCK_JERSEYS into MongoDB.
 * GET or POST /api/seed — clears jerseys collection and inserts seed data.
 */
export async function GET() {
  return runSeed();
}

export async function POST() {
  return runSeed();
}

async function runSeed() {
  try {
    await connectDB();
    await JerseyModel.deleteMany({});
    await JerseyModel.insertMany(MOCK_JERSEYS);
    return NextResponse.json({
      ok: true,
      message: `Seeded ${MOCK_JERSEYS.length} jerseys.`,
      count: MOCK_JERSEYS.length,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Seed failed" },
      { status: 500 }
    );
  }
}
