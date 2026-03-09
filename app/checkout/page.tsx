"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { PATCH_PRICE } from "@/types/cart";
import type { OrderPayload, OrderLineItem, OrderCustomer, ShippingMethod, PaymentMethod } from "@/types/order";

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "";
const BIT_QR_IMAGE = "/img/Bit.jpeg";

const PATCH_LABELS: Record<string, string> = {
  "champions-league": "ליגת האלופות",
  "league": "", // use item.jersey.league when patch === "league"
  "none": "ללא פאצ'",
};

function buildOrderPayload(
  items: { jersey: { id: string; title: string; price?: number; imageUrl?: string; images?: string[] }; quantity: number; size?: string; customName?: string; customNumber?: string; patch?: string }[],
  customer: OrderCustomer,
  shippingMethod: ShippingMethod,
  paymentMethod: PaymentMethod,
  subtotal: number
): OrderPayload {
  const orderItems: OrderLineItem[] = items.map((item) => {
    const patchExtra = (item.patch === "champions-league" || item.patch === "league") ? PATCH_PRICE : 0;
    const unitPrice = (item.jersey.price ?? 0) + patchExtra;
    return {
      jerseyId: item.jersey.id,
      title: item.jersey.title,
      quantity: item.quantity,
      size: item.size,
      customName: item.customName,
      customNumber: item.customNumber,
      patch: item.patch,
      patchLabel: item.patch === "league" ? item.jersey.league : undefined,
      price: unitPrice * item.quantity,
      imageUrl: item.jersey.images?.[0] ?? item.jersey.imageUrl,
    };
  });
  return {
    items: orderItems,
    customer,
    shippingMethod,
    paymentMethod,
    subtotal,
    status: paymentMethod === "whatsapp-bit" ? "pending-payment" : undefined,
  };
}

function buildWhatsAppMessage(payload: OrderPayload): string {
  const lines = [
    "הזמנה חדשה TheFootyKits",
    "",
    "פרטי לקוח:",
    `שם: ${payload.customer.name}`,
    `טלפון: ${payload.customer.phone}`,
    `עיר: ${payload.customer.city}`,
    `כתובת: ${payload.customer.address}`,
    "",
    "פריטים:",
    ...payload.items.map(
      (i) =>
        `• ${i.title} x${i.quantity}${i.size ? ` מידה ${i.size}` : ""}${i.patch && i.patch !== "none" ? ` ${i.patchLabel ?? PATCH_LABELS[i.patch] ?? i.patch}` : ""}${i.customName || i.customNumber ? ` (${[i.customName, i.customNumber].filter(Boolean).join(" #")})` : ""} - ₪${i.price.toFixed(2)}`
    ),
    "",
    `סה"כ: ₪${payload.subtotal.toFixed(2)}`,
  ];
  return lines.join("\n");
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState<{ orderId: string; payload: OrderPayload } | null>(null);

  const [customer, setCustomer] = useState<OrderCustomer>({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
  });
  const [shippingMethod] = useState<ShippingMethod>("home-delivery");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("whatsapp-bit");

  const handleCustomerChange = (field: keyof OrderCustomer, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const payload = useMemo(
    () => buildOrderPayload(items, customer, shippingMethod, paymentMethod, subtotal),
    [items, customer, shippingMethod, paymentMethod, subtotal]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!customer.phone.trim()) {
      setError("נא להזין מספר טלפון.");
      return;
    }
    if (!customer.name.trim()) {
      setError("נא להזין שם.");
      return;
    }
    if (paymentMethod === "credit-card") {
      setError("תשלום בכרטיס אשראי יהיה זמין בקרוב.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "שגיאה בשמירת ההזמנה");
        setSubmitting(false);
        return;
      }
      const orderId = data.orderId as string;
      setSuccessModal({ orderId, payload });
      try {
        if (WHATSAPP_PHONE) {
          const text = encodeURIComponent(buildWhatsAppMessage(payload));
          const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE.replace(/\D/g, "")}?text=${text}`;
          sessionStorage.setItem(`pendingOrder_${orderId}`, whatsappUrl);
        } else {
          sessionStorage.setItem(`pendingOrder_${orderId}`, "pending");
        }
      } catch (_) {}
      setSubmitting(false);
    } catch (err) {
      setError("שגיאה בחיבור. נסה שוב.");
      setSubmitting(false);
    }
  };

  const handleConfirmViaWhatsApp = () => {
    if (!successModal || !WHATSAPP_PHONE) return;
    const text = encodeURIComponent(buildWhatsAppMessage(successModal.payload));
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE.replace(/\D/g, "")}?text=${text}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCloseModal = () => {
    const orderId = successModal?.orderId ?? "";
    clearCart();
    setSuccessModal(null);
    router.push(`/checkout/thank-you?orderId=${encodeURIComponent(orderId)}&pending=1`);
  };

  if (items.length === 0 && !successModal) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12 text-gray-900">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold">העגלה ריקה</h1>
          <p className="mt-2 text-gray-500">הוסף פריטים לעגלה לפני התשלום.</p>
          <Link href="/" className="mt-6 inline-block text-gray-600 underline hover:text-gray-900">
            חזרה לחנות
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 md:py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold md:text-3xl">השלמת הזמנה</h1>
          <p className="mt-1 text-gray-600">מלא פרטי משלוח ובחר אמצעי תשלום.</p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold">פרטי משלוח</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">שם מלא <span className="text-red-500">*</span></label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={customer.name}
                      onChange={(e) => handleCustomerChange("name", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-900"
                      placeholder="שם מלא"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">טלפון <span className="text-red-500">*</span></label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => handleCustomerChange("phone", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-900"
                      placeholder="050-0000000"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">עיר <span className="text-red-500">*</span></label>
                    <input
                      id="city"
                      type="text"
                      required
                      value={customer.city}
                      onChange={(e) => handleCustomerChange("city", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-900"
                      placeholder="עיר"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">כתובת <span className="text-red-500">*</span></label>
                    <input
                      id="address"
                      type="text"
                      required
                      value={customer.address}
                      onChange={(e) => handleCustomerChange("address", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-900"
                      placeholder="רחוב, מספר בית"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold">אמצעי תשלום</h2>
                <div className="mt-4 flex gap-4">
                  <label className="flex flex-1 cursor-not-allowed items-center gap-3 rounded-xl border-2 border-gray-200 bg-gray-50 p-4 opacity-75">
                    <input type="radio" name="payment" disabled checked={false} readOnly className="h-4 w-4" />
                    <span>כרטיס אשראי (בקרוב)</span>
                  </label>
                  <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-xl border-2 border-gray-900 bg-gray-50 p-4">
                    <input
                      type="radio"
                      name="payment"
                      checked
                      readOnly
                      className="h-4 w-4"
                    />
                    <span>Bit / WhatsApp</span>
                  </label>
                </div>
              </section>
            </div>

            <div>
              <section className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold">סיכום הזמנה</h2>
                <ul className="mt-4 space-y-3">
                  {items.map((item, index) => (
                    <li key={`${item.jersey.id}-${index}`} className="flex gap-3 rounded-lg border border-gray-100 p-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        {(item.jersey.images?.[0] ?? item.jersey.imageUrl) ? (
                          <Image
                            src={item.jersey.images?.[0] ?? item.jersey.imageUrl!}
                            alt={item.jersey.title}
                            fill
                            className="object-contain"
                            sizes="64px"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 truncate">{item.jersey.title}</p>
                        {(item.size || item.patch || item.customName || item.customNumber) && (
                          <p className="text-xs text-gray-500">
                            {item.size && `מידה ${item.size}`}
                            {item.patch && item.patch !== "none" && ` · ${item.patch === "league" ? item.jersey.league : (PATCH_LABELS[item.patch] ?? item.patch)}`}
                            {(item.customName || item.customNumber) && ` · ${[item.customName, item.customNumber].filter(Boolean).join(" #")}`}
                          </p>
                        )}
                        <p className="text-sm font-semibold text-gray-900">
                          ₪{(((item.jersey.price ?? 0) + ((item.patch === "champions-league" || item.patch === "league") ? PATCH_PRICE : 0)) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>סה"כ</span>
                    <span>₪{subtotal.toFixed(2)}</span>
                  </div>
                </div>
                {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-4 w-full rounded-xl bg-gray-900 py-3.5 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-60"
                >
                  {submitting ? "שומר הזמנה..." : "השלם הזמנה"}
                </button>
                <Link href="/" className="mt-3 block text-center text-sm text-gray-500 hover:text-gray-900">
                  חזרה לחנות
                </Link>
              </section>
            </div>
          </form>
        </div>
      </main>

      {/* Success modal — Bit QR + WhatsApp */}
      {successModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-label="תשלום Bit">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <h3 className="text-center text-xl font-bold text-gray-900">ההזמנה נשמרה</h3>
            <p className="mt-2 text-center text-sm text-gray-600">סרוק את קוד ה-QR לתשלום ב-Bit</p>
            <div className="mt-4 flex justify-center">
              <div className="relative h-64 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white">
                <Image
                  src={BIT_QR_IMAGE}
                  alt="קוד QR לתשלום Bit"
                  fill
                  className="object-contain"
                  sizes="256px"
                />
              </div>
            </div>
            {WHATSAPP_PHONE ? (
              <button
                type="button"
                onClick={handleConfirmViaWhatsApp}
                className="mt-6 w-full rounded-xl bg-[#25D366] py-3.5 font-semibold text-white transition hover:opacity-90"
              >
                אישור תשלום בוואטסאפ
              </button>
            ) : null}
            <button
              type="button"
              onClick={handleCloseModal}
              className="mt-3 w-full rounded-xl border border-gray-200 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              סיום
            </button>
          </div>
        </div>
      )}
    </>
  );
}