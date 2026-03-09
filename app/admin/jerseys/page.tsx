"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Jersey } from "@/types/jersey";
import { LEAGUES } from "@/lib/leagues";

const ADMIN_TOKEN_KEY = "admin_orders_token";
const DECADES = ["70s", "80s", "90s", "00s", "10s", "20s"] as const;
const DEFAULT_SIZES = ["S", "M", "L", "XL"];

function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = sessionStorage.getItem(ADMIN_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const emptyJersey = (): Partial<Jersey> & { imagesText: string } => ({
  title: "",
  club: "",
  league: LEAGUES[0]?.label ?? "",
  era: "",
  decade: "20s",
  story: "",
  theme: { primary: "#000000", secondary: "#ffffff" },
  imageUrl: "",
  imagesText: "",
  price: undefined,
  sizes: DEFAULT_SIZES,
  trending: false,
  isNationalTeam: false,
});

function jerseyToForm(j: Jersey): Partial<Jersey> & { imagesText: string } {
  return {
    id: j.id,
    title: j.title,
    club: j.club,
    league: j.league,
    era: j.era,
    decade: j.decade,
    story: j.story ?? "",
    theme: j.theme ?? { primary: "#000000", secondary: "#ffffff" },
    imageUrl: j.imageUrl ?? "",
    imagesText: j.images?.join("\n") ?? "",
    price: j.price,
    sizes: j.sizes?.length ? j.sizes : DEFAULT_SIZES,
    trending: j.trending ?? false,
    isNationalTeam: j.isNationalTeam ?? false,
  };
}

export default function AdminJerseysPage() {
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Jersey> & { imagesText: string }>(emptyJersey());
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchJerseys = useCallback(async () => {
    const res = await fetch("/api/admin/jerseys", { headers: getAuthHeaders() });
    if (res.status === 401) {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
      window.location.href = "/admin";
      return;
    }
    if (!res.ok) throw new Error("שגיאה בטעינת החולצות");
    const data = await res.json();
    setJerseys(data.jerseys ?? []);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchJerseys().catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, [fetchJerseys]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const payload = {
      ...form,
      theme: form.theme || { primary: "#000000", secondary: "#ffffff" },
      sizes: form.sizes?.length ? form.sizes : DEFAULT_SIZES,
    };
    try {
      const url = editingId
        ? `/api/admin/jerseys/${encodeURIComponent(editingId)}`
        : "/api/admin/jerseys";
      const res = await fetch(url, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.status === 401) {
        sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        window.location.href = "/admin";
        return;
      }
      if (!res.ok) throw new Error(data.error || "שגיאה בשמירה");
      setForm(emptyJersey());
      setFormOpen(false);
      setEditingId(null);
      await fetchJerseys();
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (j: Jersey) => {
    setForm(jerseyToForm(j));
    setEditingId(j.id);
    setFormOpen(true);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (typeof window !== "undefined" && !window.confirm("למחוק את החולצה?")) return;
    setError(null);
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/jerseys/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.status === 401) {
        sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        window.location.href = "/admin";
        return;
      }
      if (!res.ok) throw new Error(data.error || "שגיאה במחיקה");
      if (editingId === id) {
        setFormOpen(false);
        setEditingId(null);
      }
      await fetchJerseys();
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה במחיקה");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">חולצות</h1>
        <button
          type="button"
          onClick={() => { setFormOpen(true); setForm(emptyJersey()); setEditingId(null); setError(null); }}
          className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
        >
          + הוסף חולצה
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {formOpen && (
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            {editingId ? "עריכת חולצה" : "חולצה חדשה"}
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">כותרת *</label>
              <input
                type="text"
                value={form.title ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900"
                placeholder="למשל: ברצלונה בית 2025/26"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">קבוצה *</label>
              <input
                type="text"
                value={form.club ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, club: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900"
                placeholder="FC Barcelona"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ליגה *</label>
              <select
                value={form.league ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, league: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900"
                required
              >
                {LEAGUES.map((l) => (
                  <option key={l.slug} value={l.label}>{l.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">עונה / עידן *</label>
              <input
                type="text"
                value={form.era ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, era: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900"
                placeholder="בלאוגרנה"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">עשור *</label>
              <select
                value={form.decade ?? "20s"}
                onChange={(e) => setForm((f) => ({ ...f, decade: e.target.value as Jersey["decade"] }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900"
              >
                {DECADES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">מחיר (₪)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value ? Number(e.target.value) : undefined }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900"
                placeholder="119.9"
              />
            </div>
            <div className="flex items-center gap-4 sm:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.trending ?? false}
                  onChange={(e) => setForm((f) => ({ ...f, trending: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">במובלט (טרנדינג)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isNationalTeam ?? false}
                  onChange={(e) => setForm((f) => ({ ...f, isNationalTeam: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">נבחרת</span>
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">תמונה ראשית</label>
              <p className="mt-0.5 text-xs text-gray-500">
                נתיב לקובץ מתוך התיקייה public. למשל: /img/jerseys/שם-החולצה.png — הקובץ צריך להיות כבר בתיקייה public/img/jerseys/
              </p>
              <input
                type="text"
                value={form.imageUrl ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900"
                placeholder="/img/jerseys/barca-home.png"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">תמונות נוספות (גלריית מוצר)</label>
              <p className="mt-0.5 text-xs text-gray-500">
                שורה אחת לכל נתיב. אותן תמונות צריכות להיות ב-public (למשל public/img/jerseys/).
              </p>
              <textarea
                value={form.imagesText ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, imagesText: e.target.value }))}
                rows={3}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 font-mono text-sm"
                placeholder={"/img/jerseys/barca-front.png\n/img/jerseys/barca-back.png"}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">סיפור (אופציונלי)</label>
              <textarea
                value={form.story ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, story: e.target.value }))}
                rows={2}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900"
                placeholder="טקסט על החולצה..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">צבע ראשי (theme)</label>
              <input
                type="text"
                value={form.theme?.primary ?? "#000000"}
                onChange={(e) => setForm((f) => ({ ...f, theme: { primary: e.target.value, secondary: f.theme?.secondary ?? "#ffffff" } }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900"
                placeholder="#A50044"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">צבע משני</label>
              <input
                type="text"
                value={form.theme?.secondary ?? "#ffffff"}
                onChange={(e) => setForm((f) => ({ ...f, theme: { primary: f.theme?.primary ?? "#000000", secondary: e.target.value } }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900"
                placeholder="#004D98"
              />
            </div>
            <div className="flex gap-2 sm:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
              >
                {submitting ? "שומר..." : editingId ? "עדכון" : "שמירה"}
              </button>
              <button
                type="button"
                onClick={() => { setFormOpen(false); setEditingId(null); setError(null); }}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                ביטול
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">טוען חולצות...</p>
      ) : jerseys.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-500">
          אין חולצות במערכת. הוסף חולצה ראשונה או הרץ seed (POST /api/seed) לנתוני דמו.
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jerseys.map((j) => (
            <li
              key={j.id}
              className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                {(j.images?.[0] ?? j.imageUrl) ? (
                  <Image
                    src={j.images?.[0] ?? j.imageUrl!}
                    alt={j.title}
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">אין תמונה</div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 truncate">{j.title}</p>
                <p className="text-sm text-gray-500">{j.club} · {j.league}</p>
                <p className="text-sm font-semibold text-gray-900">₪{j.price ?? "—"}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Link
                    href={`/products/${j.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    צפה במוצר →
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleEdit(j)}
                    className="text-xs font-medium text-gray-600 hover:text-gray-900"
                  >
                    ערוך
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(j.id)}
                    disabled={deletingId === j.id}
                    className="text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                  >
                    {deletingId === j.id ? "מוחק..." : "מחק"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
