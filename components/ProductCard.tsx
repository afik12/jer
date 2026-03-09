"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Jersey } from "@/types/jersey";
import { useCart } from "@/contexts/CartContext";
import { getButtonTheme } from "@/lib/theme-utils";

interface ProductCardProps {
  jersey: Jersey;
  index?: number;
}

/**
 * High-conversion product card (jerseyniho-inspired, premium). Light bg, clear Add to Cart, theme hover shadow.
 */
export function ProductCard({ jersey, index = 0 }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCart();

  const buttonTheme = getButtonTheme(jersey.theme);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(jersey);
    openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group h-full w-full"
    >
      <Link
        href={`/products/${jersey.id}`}
        className="block h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded-xl"
      >
        <div className="relative overflow-visible rounded-xl bg-white transition-shadow duration-300 group-hover:shadow-lg shadow-sm border border-gray-100">
          {/* Image — קטן קצת בתוך הריבוע, עם ריווח לבן */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl bg-white">
            {(jersey.images?.[0] ?? jersey.imageUrl) ? (
              <div className="absolute inset-3 sm:inset-4">
                <Image
                  src={jersey.images?.[0] ?? jersey.imageUrl!}
                  alt={jersey.title}
                  fill
                  className="object-contain transition-transform duration-400 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-white transition-transform duration-400 ease-out group-hover:scale-[1.03]" />
            )}
            {/* Hover shadow — neutral for all */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none rounded-xl"
              style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06), 0 12px 24px -8px rgba(0,0,0,0.12)" }}
            />
          </div>
          {/* Caption + CTA — clean, white card, לא נחתך */}
          <div className="rounded-b-xl bg-white p-4 pb-5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
              {jersey.club}
            </p>
            <h3 className="mt-1 text-sm font-semibold tracking-tight text-gray-900 line-clamp-2">
              {jersey.title}
            </h3>
            <p className="mt-2 text-base font-bold text-gray-900">
              ₪{jersey.price?.toFixed(2) ?? "—"}
            </p>
            <motion.button
              type="button"
              onClick={handleAddToCart}
              className={`mt-3 w-full rounded-lg py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${buttonTheme.textClassName}`}
              style={{
                backgroundColor: buttonTheme.backgroundColor,
                boxShadow: `0 2px 8px ${buttonTheme.shadowColor}`,
              }}
              whileTap={{ scale: 0.98 }}
            >
              {added ? "נוסף ✓" : "הוסף לעגלה"}
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
