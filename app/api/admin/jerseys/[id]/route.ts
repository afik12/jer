import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { JerseyModel } from "@/models/Jersey";
import { isAdminRequest } from "@/lib/admin-auth";
import type { Jersey } from "@/types/jersey";

/** Update a jersey by id (admin only). */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
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

    const update: Partial<Jersey> = {
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
    const doc = await JerseyModel.findOneAndUpdate(
      { id },
      { $set: update },
      { new: true }
    ).lean();
    if (!doc) {
      return NextResponse.json({ ok: false, error: "חולצה לא נמצאה" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, jersey: doc });
  } catch (error) {
    console.error("Admin jersey update error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "שגיאה בעדכון" },
      { status: 500 }
    );
  }
}

/** Delete a jersey by id (admin only). */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    await connectDB();
    const result = await JerseyModel.deleteOne({ id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ ok: false, error: "חולצה לא נמצאה" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin jersey delete error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "שגיאה במחיקה" },
      { status: 500 }
    );
  }
}
