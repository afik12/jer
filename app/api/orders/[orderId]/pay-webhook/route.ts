import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { OrderModel } from "@/models/Order";
import { isPaymentWebhookRequest } from "@/lib/admin-auth";

type RouteContext = { params: Promise<{ orderId: string }> };

/**
 * Payment webhook: mark order as paid (e.g. when Bit or another provider confirms payment).
 * POST /api/orders/[orderId]/pay-webhook
 * Header: X-Webhook-Secret: <PAYMENT_WEBHOOK_SECRET> or Authorization: Bearer <PAYMENT_WEBHOOK_SECRET>
 * If PAYMENT_WEBHOOK_SECRET is not set, returns 503.
 */
export async function POST(request: NextRequest, context: RouteContext) {
  if (!isPaymentWebhookRequest(request)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized or webhook not configured" },
      { status: process.env.PAYMENT_WEBHOOK_SECRET ? 401 : 503 }
    );
  }
  try {
    const { orderId } = await context.params;
    await connectDB();
    const order = await OrderModel.findOneAndUpdate(
      { orderId },
      { $set: { status: "paid" } },
      { new: true }
    );
    if (!order) {
      return NextResponse.json({ ok: false, error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, orderId, status: "paid" });
  } catch (error) {
    console.error("Pay webhook error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Error" },
      { status: 500 }
    );
  }
}
