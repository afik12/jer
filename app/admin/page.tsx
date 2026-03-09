"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ADMIN_TOKEN_KEY = "admin_orders_token";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(ADMIN_TOKEN_KEY)) {
      router.replace("/admin/jerseys");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/orders?status=pending-payment", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.status === 401) {
        setError("סיסמה לא נכונה");
        return;
      }
      if (!res.ok) throw new Error("שגיאה");
      sessionStorage.setItem(ADMIN_TOKEN_KEY, password);
      router.replace("/admin/jerseys");
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">כניסת מנהל</h1>
          <p className="mt-1 text-sm text-gray-600">
            ניהול חולצות והזמנות
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-password" className="sr-only">
                סיסמה
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="סיסמת ניהול"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/20"
                required
                autoFocus
              />
            </div>
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gray-900 py-2.5 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-60"
            >
              {loading ? "בודק..." : "כניסה"}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-900">
            חזרה לחנות
          </a>
        </p>
      </div>
    </main>
  );
}
