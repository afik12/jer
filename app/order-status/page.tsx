"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Status = "pending-payment" | "paid" | "completed";

export default function OrderStatusPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("orderId") ?? "";
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ orderId: string; status: Status } | null>(null);

  useEffect(() => {
    if (q) setOrderId(q);
  }, [q]);

  useEffect(() => {
    if (!q) return;
    const id = q.trim();
    if (!id) return;
    setLoading(true);
    setError(null);
    setResult(null);
    fetch(`/api/orders/${encodeURIComponent(id)}/status`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && data.orderId) {
          setResult({ orderId: data.orderId, status: data.status });
        } else {
          setError(data.error || "הזמנה לא נמצאה");
        }
      })
      .catch(() => setError("שגיאה בחיבור"))
      .finally(() => setLoading(false));
  }, [q]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = orderId.trim();
    if (!id) return;
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(id)}/status`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "שגיאה");
        setLoading(false);
        return;
      }
      setResult({ orderId: data.orderId, status: data.status });
    } catch {
      setError("שגיאה בחיבור");
    } finally {
      setLoading(false);
    }
  };

  const statusText =
    result?.status === "paid"
      ? "התשלום התקבל"
      : result?.status === "completed"
        ? "ההזמנה הושלמה"
        : "מחכה לתשלום";

  const statusColor =
    result?.status === "paid"
      ? "bg-green-100 text-green-800"
      : result?.status === "completed"
        ? "bg-gray-100 text-gray-800"
        : "bg-amber-100 text-amber-800";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 text-gray-900">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-center">בדיקת סטטוס הזמנה</h1>
        <p className="mt-2 text-center text-gray-600 text-sm">
          הזן את מספר ההזמנה כדי לראות אם התשלום התקבל
        </p>
        <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
            מספר הזמנה
          </label>
          <input
            id="orderId"
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="למשל TFK-xxx-xxx"
            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2.5 font-mono text-gray-900"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-gray-900 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "בודק..." : "בדוק"}
          </button>
        </form>
        {result && (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-center">
            <p className="font-mono text-sm text-gray-500">{result.orderId}</p>
            <p className={`mt-2 rounded-full px-4 py-2 text-sm font-medium inline-block ${statusColor}`}>
              {statusText}
            </p>
          </div>
        )}
        <Link href="/" className="mt-6 block text-center text-sm text-gray-500 hover:text-gray-900">
          חזרה לחנות
        </Link>
      </div>
    </main>
  );
}
