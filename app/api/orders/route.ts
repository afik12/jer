import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { OrderModel } from "@/models/Order";
import type { OrderPayload } from "@/types/order";
import { isAdminRequest } from "@/lib/admin-auth";

function generateOrderId(): string {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).slice(2, 8);
  return `TFK-${t}-${r}`.toUpperCase();
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as OrderPayload;
    const { items, customer, shippingMethod, paymentMethod, subtotal, status } = body;

    if (!items?.length || !customer?.phone) {
      return NextResponse.json(
        { ok: false, error: "חסרים פריטים או פרטי לקוח" },
        { status: 400 }
      );
    }

    await connectDB();
    const orderId = generateOrderId();
    const orderStatus =
      paymentMethod === "whatsapp-bit"
        ? "pending-payment"
        : (status ?? "pending-payment");
    await OrderModel.create({
      items,
      customer: {
        name: customer.name ?? "",
        phone: customer.phone,
        email: customer.email ?? "",
        city: customer.city ?? "",
        address: customer.address ?? "",
      },
      shippingMethod: shippingMethod ?? "home-delivery",
      paymentMethod: paymentMethod ?? "credit-card",
      subtotal: subtotal ?? 0,
      orderId,
      status: orderStatus,
    });

    return NextResponse.json({ ok: true, orderId });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "שגיאה בשמירת ההזמנה" },
      { status: 500 }
    );
  }
}

/** List orders (admin only). Query: ?status=pending-payment to filter. */
export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const filter = status ? { status } : {};
    const orders = await OrderModel.find(filter)
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ ok: true, orders });
  } catch (error) {
    console.error("Orders list error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "שגיאה" },
      { status: 500 }
    );
  }
}
