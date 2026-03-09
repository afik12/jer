"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const pending = searchParams.get("pending") === "1";
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId || !pending) return;
    try {
      const stored = sessionStorage.getItem(`pendingOrder_${orderId}`);
      setWhatsappUrl(stored && stored.startsWith("http") ? stored : null);
    } catch {
      setWhatsappUrl(null);
    }
  }, [orderId, pending]);

  const isPending = pending && orderId;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 text-gray-900">
      <div className="mx-auto max-w-lg text-center">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {isPending ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">ההזמנה נשמרה – נשאר לשלם</h1>
              <p className="mt-3 text-gray-600">
                התשלום עדיין לא התקבל. כדי להשלים את התשלום, שלח אלינו את פרטי ההזמנה בוואטסאפ או צור איתנו קשר.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">תודה שהזמנת!</h1>
              <p className="mt-3 text-gray-600">
                ההזמנה התקבלה. נצור איתך קשר בהקדם להשלמת התשלום והמשלוח.
              </p>
            </>
          )}
          {orderId && (
            <p className="mt-4 rounded-lg bg-gray-100 px-4 py-2 font-mono text-sm text-gray-700">
              מספר הזמנה: {orderId}
            </p>
          )}
          {isPending && whatsappUrl && (
            <>
              <p className="mt-4 text-sm text-gray-600">
                לחץ לשליחת פרטי ההזמנה בוואטסאפ:
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block w-full rounded-xl bg-[#25D366] py-3.5 font-semibold text-white transition hover:opacity-90"
              >
                שלח פרטי תשלום בוואטסאפ
              </a>
            </>
          )}
          {isPending && !whatsappUrl && (
            <p className="mt-4 text-sm text-amber-700">
              צור איתנו קשר להשלמת התשלום (טלפון / וואטסאפ).
            </p>
          )}
          {orderId && (
            <Link
              href={`/order-status?orderId=${encodeURIComponent(orderId)}`}
              className="mt-4 block text-sm text-gray-500 underline hover:text-gray-900"
            >
              בדוק אם התשלום התקבל
            </Link>
          )}
          <Link
            href="/"
            className="mt-6 inline-block w-full rounded-xl border border-gray-200 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            חזרה לחנות
          </Link>
        </div>
      </div>
    </main>
  );
}
