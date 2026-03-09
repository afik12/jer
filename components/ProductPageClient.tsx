"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Jersey } from "@/types/jersey";
import type { PatchId } from "@/types/cart";
import { PATCH_PRICE } from "@/types/cart";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { ProductGallery } from "@/components/ProductGallery";
import { getButtonTheme, getAccentColor } from "@/lib/theme-utils";

const SIZE_OPTIONS = ["S", "M", "L", "XL", "XXL"];

/** Maps jersey.league to patch image path (public/img/patches or public/img). */
export const LEAGUE_PATCH_IMAGES: Record<string, string> = {
  "La Liga": "/img/patches/la-liga.png",
  "לה ליגה": "/img/patches/la-liga.png",
  "פרימייר ליג": "/img/patches/premier-league.png",
  "Premier League": "/img/patches/premier-league.png",
  "Serie A": "/img/patches/serie-a.png",
  "סרייה א'": "/img/patches/serie-a.png",
  "Ligue 1": "/img/patches/ligue-1.png",
  "Bundesliga": "/img/patches/bundesliga.webp",
  "נבחרות": "/img/patches/national-teams.png",
  "Retro": "/img/patches/retro.png",
};

interface ProductPageClientProps {
  jersey: Jersey | null;
}

export function ProductPageClient({ jersey }: ProductPageClientProps) {
  const { setTheme } = useTheme();
  const { addItem, openCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPatch, setSelectedPatch] = useState<PatchId>("none");
  const [personalizationOn, setPersonalizationOn] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  const [storyOpen, setStoryOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  useEffect(() => {
    return () => setTheme(null);
  }, [setTheme]);

  const sizes = jersey?.sizes?.length ? jersey.sizes : SIZE_OPTIONS;
  const isRetro = jersey?.decade === "80s" || jersey?.decade === "90s";
  const isNationalTeam = jersey?.isNationalTeam === true;

  useEffect(() => {
    if (isRetro && selectedPatch === "league") setSelectedPatch("none");
    if (isNationalTeam && selectedPatch === "champions-league") setSelectedPatch("none");
  }, [isRetro, isNationalTeam, selectedPatch]);

  const handleAddToCart = useCallback(() => {
    if (!jersey) return;
    if (!selectedSize) {
      setSelectedSize(sizes[0]);
    }
    addItem(
      jersey,
      1,
      {
        size: selectedSize ?? sizes[0],
        patch: selectedPatch,
        customName: personalizationOn ? customName : undefined,
        customNumber: personalizationOn ? customNumber : undefined,
      }
    );
    openCart();
  }, [
    jersey,
    selectedSize,
    selectedPatch,
    personalizationOn,
    customName,
    customNumber,
    sizes,
    addItem,
    openCart,
  ]);

  if (!jersey) {
    return (
      <main className="min-h-screen bg-white px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <p className="text-gray-500">החולצה לא נמצאה.</p>
          <Link href="/" className="mt-4 inline-block text-gray-600 underline hover:text-gray-900">
            חזרה לחנות
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
        >
          ← חזרה לחנות
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid gap-8 lg:grid-cols-2 lg:gap-12"
        >
          <ProductGallery jersey={jersey} />

          <div className="flex flex-col">
            <span
              className="mb-2 inline-block w-fit rounded-lg px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{
                color: jersey.theme.primary,
                backgroundColor: `${jersey.theme.primary}18`,
              }}
            >
              {jersey.era}
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {jersey.title}
            </h1>
            <p className="mt-1 text-lg text-gray-600">{jersey.club}</p>
            <p className="mt-4 text-2xl font-bold text-gray-900">
              ₪{((jersey.price ?? 0) + (selectedPatch === "champions-league" || selectedPatch === "league" ? PATCH_PRICE : 0)).toFixed(2)}
            </p>

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-gray-700">פאצ׳ים</p>
              {isRetro && (
                <p className="mb-2 text-xs text-gray-500">חולצות רטרו — ליגת האלופות או בלי פאצ׳</p>
              )}
              {isNationalTeam && (
                <p className="mb-2 text-xs text-gray-500">נבחרות — ליגה או בלי פאצ׳</p>
              )}
              <div className="flex flex-wrap gap-2">
                {(isRetro
                  ? [
                      { id: "champions-league" as const, label: `ליגת האלופות + ${PATCH_PRICE}₪`, imageUrl: "/img/patches/champions-league.png" },
                      { id: "none" as const, label: "ללא פאצ'", imageUrl: undefined },
                    ]
                  : isNationalTeam
                    ? [
                        { id: "league" as const, label: `${jersey.league} + ${PATCH_PRICE}₪`, imageUrl: LEAGUE_PATCH_IMAGES[jersey.league] },
                        { id: "none" as const, label: "ללא פאצ'", imageUrl: undefined },
                      ]
                    : [
                        { id: "champions-league" as const, label: `ליגת האלופות + ${PATCH_PRICE}₪`, imageUrl: "/img/patches/champions-league.png" },
                        { id: "league" as const, label: `${jersey.league} + ${PATCH_PRICE}₪`, imageUrl: LEAGUE_PATCH_IMAGES[jersey.league] },
                        { id: "none" as const, label: "ללא פאצ'", imageUrl: undefined },
                      ]
                ).map((opt) => {
                  const isSelected = selectedPatch === opt.id;
                  const accent = getAccentColor(jersey.theme);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedPatch(opt.id)}
                      className="flex min-w-0 items-center gap-2 rounded-lg border-2 px-3 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      style={{
                        borderColor: isSelected ? accent.text : "rgb(229 231 235)",
                        backgroundColor: isSelected ? accent.bg : "white",
                        color: isSelected ? accent.text : "rgb(55 65 81)",
                      }}
                    >
                      {opt.imageUrl && (
                        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded bg-white border border-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={opt.imageUrl}
                            alt=""
                            className="h-full w-full object-contain p-0.5"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                          />
                        </span>
                      )}
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-gray-700">מידה</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  const accent = getAccentColor(jersey.theme);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[2.75rem] rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      style={{
                        borderColor: isSelected ? accent.text : "rgb(229 231 235)",
                        backgroundColor: isSelected ? accent.bg : "white",
                        color: isSelected ? accent.text : "rgb(55 65 81)",
                      }}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={personalizationOn}
                  onChange={(e) => setPersonalizationOn(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                  style={{ accentColor: getAccentColor(jersey.theme).text }}
                />
                <span className="text-sm font-medium text-gray-700">
                  הוסף שם ומספר (חינם)
                </span>
              </label>
              <AnimatePresence>
                {personalizationOn && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 flex gap-3">
                      <div className="flex-1">
                        <label htmlFor="custom-name" className="sr-only">שם</label>
                        <input
                          id="custom-name"
                          type="text"
                          placeholder="שם"
                          value={customName}
                          onChange={(e) => setCustomName(e.target.value)}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                        />
                      </div>
                      <div className="w-24">
                        <label htmlFor="custom-number" className="sr-only">מספר</label>
                        <input
                          id="custom-number"
                          type="text"
                          inputMode="numeric"
                          placeholder="מס׳"
                          value={customNumber}
                          onChange={(e) => setCustomNumber(e.target.value.replace(/\D/g, "").slice(0, 3))}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {(() => {
              const btn = getButtonTheme(jersey.theme);
              return (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`mt-8 w-full rounded-xl py-4 text-lg font-semibold shadow-lg transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${btn.textClassName}`}
                  style={{
                    backgroundColor: btn.backgroundColor,
                    boxShadow: `0 4px 14px ${btn.shadowColor}`,
                  }}
                >
                  הוסף לעגלה
                </button>
              );
            })()}

            <div className="mt-10 border-t border-gray-200 pt-8">
              {jersey.story && (
                <div className="border-b border-gray-200">
                  <button
                    type="button"
                    onClick={() => setStoryOpen((o) => !o)}
                    className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-gray-900"
                  >
                    <span>סיפור החולצה</span>
                    <span className="text-gray-400">{storyOpen ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence>
                    {storyOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 text-sm leading-relaxed text-gray-600">
                          {jersey.story}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              <div>
                <button
                  type="button"
                  onClick={() => setShippingOpen((o) => !o)}
                  className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-gray-900"
                >
                  <span>משלוחים והחזרות</span>
                  <span className="text-gray-400">{shippingOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence>
                  {shippingOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-sm leading-relaxed text-gray-600">
                        משלוח חינם לכל הארץ. הדפסת שם ומספר בחינם על הפריט.
                        משלוח רגיל 3–5 ימי עסקים. החזרות קלות עד 30 יום.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
