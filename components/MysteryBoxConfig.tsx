"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import type { Jersey } from "@/types/jersey";

const SIZE_OPTIONS = ["S", "M", "L", "XL", "XXL"];
const CLASSIC_PRICE = 79.99;
const RETRO_PRICE = 99.99;

type Tier = "classic" | "retro";

const MYSTERY_BOX_THEME = {
  primary: "#6B21A8",
  secondary: "#B45309",
  bgStart: "#1e1b4b",
  bgEnd: "#312e81",
};

function buildMysteryBoxJersey(price: number): Jersey {
  return {
    id: "mystery-box",
    title: "Mystery Box",
    club: "Surprise Jersey",
    league: "Mystery",
    era: "Surprise",
    decade: "20s",
    theme: MYSTERY_BOX_THEME,
    price,
    sizes: SIZE_OPTIONS,
  };
}

export function MysteryBoxConfig() {
  const { addItem, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(SIZE_OPTIONS[1]);
  const [tier, setTier] = useState<Tier>("classic");
  const [exclusions, setExclusions] = useState("");

  const price = tier === "classic" ? CLASSIC_PRICE : RETRO_PRICE;
  const jersey = buildMysteryBoxJersey(price);

  const handleAddToCart = useCallback(() => {
    addItem(jersey, 1, {
      size: selectedSize,
      tier: tier === "classic" ? "Classic Box" : "Retro Box",
      exclusions: exclusions.trim() || undefined,
    });
    openCart();
  }, [jersey, selectedSize, tier, exclusions, addItem, openCart]);

  return (
    <div className="mx-auto max-w-4xl">
      {/* Hero: floating box */}
      <motion.section
        className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl px-6 py-12 sm:py-16"
        style={{
          background: `linear-gradient(135deg, ${MYSTERY_BOX_THEME.bgStart} 0%, ${MYSTERY_BOX_THEME.bgEnd} 50%, #4c1d95 100%)`,
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="relative z-10 flex flex-col items-center gap-4"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="flex h-24 w-24 items-center justify-center rounded-2xl shadow-2xl sm:h-28 sm:w-28"
            style={{
              background: `linear-gradient(145deg, ${MYSTERY_BOX_THEME.primary}, ${MYSTERY_BOX_THEME.secondary})`,
              boxShadow: `0 20px 40px ${MYSTERY_BOX_THEME.primary}40`,
            }}
          >
            <span className="text-3xl sm:text-4xl" aria-hidden>📦</span>
          </div>
          <h1 className="text-center text-2xl font-bold text-white sm:text-3xl">
            Mystery Box
          </h1>
          <p className="max-w-md text-center text-sm text-white/90 sm:text-base">
            Get a surprise premium jersey — current season or a classic retro. You choose the tier; we choose the rest.
          </p>
        </motion.div>
      </motion.section>

      {/* Config form: premium gradient card */}
      <motion.section
        className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        style={{
          background: "linear-gradient(180deg, #faf5ff 0%, #ffffff 30%)",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
          Configure your box
        </h2>

        {/* Size selector */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-gray-700">Size</p>
          <div className="flex flex-wrap gap-2">
            {SIZE_OPTIONS.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className="min-w-[2.75rem] rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{
                    borderColor: isSelected ? MYSTERY_BOX_THEME.primary : "rgb(229 231 235)",
                    backgroundColor: isSelected ? `${MYSTERY_BOX_THEME.primary}15` : "white",
                    color: isSelected ? MYSTERY_BOX_THEME.primary : "rgb(55 65 81)",
                  }}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tier selection */}
        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-gray-700">Box tier</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setTier("classic")}
              className={`flex flex-col rounded-xl border-2 p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                tier === "classic"
                  ? "border-[#6B21A8] bg-[#6B21A8]/10"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="font-semibold text-gray-900">Classic Box</span>
              <span className="mt-1 text-sm text-gray-600">
                Current season & standard jerseys
              </span>
              <span className="mt-2 font-bold" style={{ color: MYSTERY_BOX_THEME.primary }}>
                ₪{CLASSIC_PRICE.toFixed(2)}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setTier("retro")}
              className={`flex flex-col rounded-xl border-2 p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                tier === "retro"
                  ? "border-[#6B21A8] bg-[#6B21A8]/10"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="font-semibold text-gray-900">Retro Box</span>
              <span className="mt-1 text-sm text-gray-600">
                Classic eras & iconic kits
              </span>
              <span className="mt-2 font-bold" style={{ color: MYSTERY_BOX_THEME.primary }}>
                ₪{RETRO_PRICE.toFixed(2)}
              </span>
            </button>
          </div>
        </div>

        {/* Exclusions */}
        <div className="mt-6">
          <label htmlFor="mystery-exclusions" className="mb-2 block text-sm font-medium text-gray-700">
            Teams / leagues to avoid <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            id="mystery-exclusions"
            placeholder="e.g., No Real Madrid, no Premier League teams..."
            value={exclusions}
            onChange={(e) => setExclusions(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          />
        </div>

        {/* Add to Cart CTA */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-2xl font-bold text-gray-900">
            ₪{price.toFixed(2)}
          </p>
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full rounded-xl py-4 text-lg font-semibold text-white shadow-lg transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:w-auto sm:min-w-[220px]"
            style={{
              backgroundColor: MYSTERY_BOX_THEME.primary,
              boxShadow: `0 4px 14px ${MYSTERY_BOX_THEME.primary}50`,
            }}
          >
            Add to Cart
          </button>
        </div>
      </motion.section>

      <p className="mt-6 text-center">
        <Link href="/" className="text-sm text-gray-500 underline hover:text-gray-900">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
