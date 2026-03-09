"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const ADMIN_TOKEN_KEY = "admin_orders_token";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const t = typeof window !== "undefined" ? sessionStorage.getItem(ADMIN_TOKEN_KEY) : null;
    setToken(t ?? null);
  }, [pathname]);

  useEffect(() => {
    if (token === undefined) return;
    const isLoginPage = pathname === "/admin" || pathname === "/admin/login";
    if (!token && !isLoginPage) {
      router.replace("/admin");
    }
  }, [token, pathname, router]);

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken(null);
    router.replace("/admin");
  };

  if (token === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-500">טוען...</p>
      </div>
    );
  }

  const isLoginPage = pathname === "/admin" || pathname === "/admin/login";
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-56 shrink-0 border-l border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-6 text-lg font-bold text-gray-900">מנהל</h2>
        <nav className="flex flex-col gap-1">
          <Link
            href="/admin/jerseys"
            className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              pathname?.startsWith("/admin/jerseys")
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            חולצות
          </Link>
          <Link
            href="/admin/orders"
            className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              pathname?.startsWith("/admin/orders")
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            הזמנות
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 text-right w-full"
          >
            יציאה
          </button>
        </nav>
        <Link
          href="/"
          className="mt-6 block text-xs text-gray-500 hover:text-gray-700"
        >
          ← חזרה לחנות
        </Link>
      </aside>
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
