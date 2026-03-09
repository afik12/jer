import { NextRequest } from "next/server";

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "";
const PAYMENT_WEBHOOK_SECRET = process.env.PAYMENT_WEBHOOK_SECRET ?? "";

/**
 * Returns true if the request has valid admin auth (Bearer token matches ADMIN_SECRET).
 * Used for GET /api/orders and PATCH /api/orders/[orderId].
 */
export function isAdminRequest(request: NextRequest): boolean {
  if (!ADMIN_SECRET) return false;
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return false;
  const token = auth.slice(7).trim();
  return token === ADMIN_SECRET;
}

/**
 * Returns true if the request has valid payment webhook auth.
 * Check: header X-Webhook-Secret or Authorization: Bearer <PAYMENT_WEBHOOK_SECRET>.
 * Used for POST /api/orders/[orderId]/pay-webhook (e.g. Bit or other provider callback).
 */
export function isPaymentWebhookRequest(request: NextRequest): boolean {
  if (!PAYMENT_WEBHOOK_SECRET) return false;
  const secret =
    request.headers.get("x-webhook-secret") ??
    (request.headers.get("authorization")?.startsWith("Bearer ")
      ? request.headers.get("authorization")!.slice(7).trim()
      : "");
  return secret === PAYMENT_WEBHOOK_SECRET;
}
