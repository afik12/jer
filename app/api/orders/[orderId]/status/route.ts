import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { OrderModel } from "@/models/Order";

type RouteContext = { params: Promise<{ orderId: string }> };

/**
 * Public: get only the status of an order (for customer to check if payment was received).
 * GET /api/orders/[orderId]/status
 * Returns: { ok: true, orderId, status: "pending-payment" | "paid" | "completed" } or 404.
 */
export async function GET(_request: Request, context: RouteContext) {
  try {
    const { orderId } = await context.params;
    await connectDB();
    const order = await OrderModel.findOne(
      { orderId },
      { status: 1, orderId: 1 }
    ).lean();
    if (!order) {
      return NextResponse.json({ ok: false, error: "הזמנה לא נמצאה" }, { status: 404 });
    }
    return NextResponse.json({
      ok: true,
      orderId: order.orderId,
      status: order.status ?? "pending-payment",
    });
  } catch (error) {
    console.error("Order status error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "שגיאה" },
      { status: 500 }
    );
  }
}
