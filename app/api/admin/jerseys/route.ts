import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { JerseyModel } from "@/models/Jersey";
import { isAdminRequest } from "@/lib/admin-auth";
import type { Jersey } from "@/types/jersey";

function slugify(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\u0590-\u05ff\-]/g, "");
}

function generateJerseyId(payload: { club: string; era?: string; title?: string }): string {
  const base = slugify(payload.club) || "jersey";
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base}-${suffix}`;
}

/** List all jerseys (admin only). */
export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const jerseys = await JerseyModel.find({}).sort({ club: 1, decade: 1 }).lean();
    return NextResponse.json({ ok: true, jerseys });
  } catch (error) {
    console.error("Admin jerseys list error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "שגיאה" },
      { status: 500 }
    );
  }
}

/** Create a new jersey (admin only). */
export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as Partial<Jersey> & { imagesText?: string };
    const {
      title,
      club,
      league,
      era,
      decade,
      story,
      theme,
      imageUrl,
      imagesText,
      images,
      price,
      sizes,
      trending,
      isNationalTeam,
    } = body;

    if (!title?.trim() || !club?.trim() || !league?.trim() || !era?.trim() || !decade) {
      return NextResponse.json(
        { ok: false, error: "חסרים שדות חובה: כותרת, קבוצה, ליגה, עונה, עשור" },
        { status: 400 }
      );
    }

    const imageList =
      images && Array.isArray(images) && images.length > 0
        ? images
        : typeof imagesText === "string"
          ? imagesText
              .split("\n")
              .map((u) => u.trim())
              .filter(Boolean)
          : undefined;

    const jerseyId =
      body.id && String(body.id).trim()
        ? String(body.id).trim()
        : generateJerseyId({ club, era, title });

    const doc: Jersey = {
      id: jerseyId,
      title: title.trim(),
      club: club.trim(),
      league: league.trim(),
      era: era.trim(),
      decade: decade as Jersey["decade"],
      story: story?.trim() || undefined,
      theme: theme && typeof theme === "object" ? theme : { primary: "#000000", secondary: "#ffffff" },
      imageUrl: imageUrl?.trim() || (imageList?.[0] ?? undefined),
      images: imageList && imageList.length > 0 ? imageList : undefined,
      price: typeof price === "number" ? price : undefined,
      sizes: Array.isArray(sizes) ? sizes : sizes ? [sizes].flat().map(String) : undefined,
      trending: Boolean(trending),
      isNationalTeam: Boolean(isNationalTeam),
    };

    await connectDB();
    await JerseyModel.create(doc);
    return NextResponse.json({ ok: true, jersey: doc });
  } catch (error) {
    console.error("Admin jersey create error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "שגיאה בשמירת החולצה" },
      { status: 500 }
    );
  }
}
