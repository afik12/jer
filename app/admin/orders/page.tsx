"use client";

import { useState, useEffect, useCallback } from "react";
import type { Order, OrderStatus } from "@/types/order";

const ADMIN_TOKEN_KEY = "admin_orders_token";

function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = sessionStorage.getItem(ADMIN_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending">("pending");

  const fetchOrders = useCallback(async () => {
    const statusParam = filter === "pending" ? "?status=pending-payment" : "";
    const res = await fetch(`/api/orders${statusParam}`, { headers: getAuthHeaders() });
    if (res.status === 401) {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
      window.location.href = "/admin";
      return;
    }
    if (!res.ok) throw new Error("שגיאה בטעינת ההזמנות");
    const data = await res.json();
    setOrders(data.orders ?? []);
  }, [filter]);

  useEffect(() => {
    setLoading(true);
    fetchOrders().catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, [fetchOrders]);

  const handleMarkPaid = async (orderId: string) => {
    setError(null);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ status: "paid" as OrderStatus }),
      });
      const data = await res.json();
      if (res.status === 401) {
        sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        window.location.href = "/admin";
        return;
      }
      if (!res.ok) throw new Error(data.error || "שגיאה");
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, status: "paid" as OrderStatus } : o))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה בעדכון");
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">הזמנות</h1>
        <button
          type="button"
          onClick={() => setFilter(filter === "pending" ? "all" : "pending")}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {filter === "pending" ? "מחכות לתשלום" : "הכל"}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading && orders.length === 0 ? (
        <p className="text-gray-500">טוען...</p>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          אין הזמנות{filter === "pending" ? " מחכות לתשלום" : ""}.
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.orderId}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono font-semibold text-gray-900">{order.orderId}</p>
                  <p className="mt-1 text-gray-700">
                    {order.customer?.name} · {order.customer?.phone}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.customer?.city}
                    {order.customer?.address ? ` · ${order.customer.address}` : ""}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    ₪{Number(order.subtotal ?? 0).toFixed(2)}
                  </p>
                  <span
                    className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : order.status === "completed"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {order.status === "paid"
                      ? "שולם"
                      : order.status === "completed"
                        ? "הושלם"
                        : "מחכה לתשלום"}
                  </span>
                </div>
                {order.status !== "paid" && order.status !== "completed" && (
                  <button
                    type="button"
                    onClick={() => order.orderId && handleMarkPaid(order.orderId)}
                    className="shrink-0 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    סומן שולם
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
