import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { OrderModel } from "@/models/Order";
import { isAdminRequest } from "@/lib/admin-auth";
import type { OrderStatus } from "@/types/order";

type RouteContext = { params: Promise<{ orderId: string }> };

/** Update order status (admin only). Body: { status: "paid" | "completed" } */
export async function PATCH(request: NextRequest, context: RouteContext) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { orderId } = await context.params;
    const body = await request.json();
    const status = body?.status as OrderStatus | undefined;
    if (!status || !["paid", "completed"].includes(status)) {
      return NextResponse.json(
        { ok: false, error: "סטטוס לא תקין (paid / completed)" },
        { status: 400 }
      );
    }
    await connectDB();
    const order = await OrderModel.findOneAndUpdate(
      { orderId },
      { $set: { status } },
      { new: true }
    );
    if (!order) {
      return NextResponse.json({ ok: false, error: "הזמנה לא נמצאה" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, orderId, status });
  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "שגיאה" },
      { status: 500 }
    );
  }
}
