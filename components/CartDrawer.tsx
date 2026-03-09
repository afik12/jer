"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { PATCH_PRICE } from "@/types/cart";

const PATCH_LABELS: Record<string, string> = {
  "champions-league": "ליגת האלופות",
  "league": "", // use item.jersey.league when patch === "league"
  "none": "ללא פאצ'",
};

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItemAt, updateQuantityAt, totalItems, subtotal } =
    useCart();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            role="button"
            tabIndex={0}
            aria-label="סגור עגלה"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            onKeyDown={(e) => e.key === "Escape" && closeCart()}
          />
          <motion.aside
            role="dialog"
            aria-label="עגלת קניות"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 className="text-xl font-semibold text-gray-900">
                העגלה שלך
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                aria-label="סגור עגלה"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <p className="py-8 text-center text-gray-500">
                  העגלה ריקה.
                </p>
              ) : (
                <ul className="space-y-4">
                  {items.map((item, index) => {
                    const { jersey, quantity, size, customName, customNumber, patch, tier, exclusions } = item;
                    const patchExtra = (patch === "champions-league" || patch === "league") ? PATCH_PRICE * quantity : 0;
                    const lineTotal = (jersey.price ?? 0) * quantity + patchExtra;
                    return (
                      <li
                        key={`${jersey.id}-${index}-${size ?? ""}-${patch ?? ""}-${customName ?? ""}-${customNumber ?? ""}-${tier ?? ""}-${exclusions ?? ""}`}
                        className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white border border-gray-100">
                          {(jersey.images?.[0] ?? jersey.imageUrl) ? (
                            <Image
                              src={jersey.images?.[0] ?? jersey.imageUrl!}
                              alt={jersey.title}
                              fill
                              className="object-contain"
                              sizes="64px"
                            />
                          ) : (
                            <div
                              className="h-full w-full"
                              style={{
                                background: jersey.theme.secondary
                                  ? `linear-gradient(135deg, ${jersey.theme.primary}, ${jersey.theme.secondary})`
                                  : jersey.theme.primary,
                              }}
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 truncate">
                            {jersey.title}
                          </p>
                          <p className="text-sm text-gray-500">{jersey.club}</p>
                          {(size || patch || customName || customNumber || tier || exclusions) && (
                            <p className="mt-0.5 text-xs text-gray-600 line-clamp-2">
                              {size && <span>מידה {size}</span>}
                              {patch && patch !== "none" && (
                                <span>{size ? " · " : ""}{patch === "league" ? jersey.league : (PATCH_LABELS[patch] ?? patch)}</span>
                              )}
                              {tier && <span>{(size || patch) ? " · " : ""}{tier}</span>}
                              {(customName || customNumber) && (
                                <span>
                                  {(size || patch || tier) ? " · " : ""}
                                  {[customName, customNumber].filter(Boolean).join(" #")}
                                </span>
                              )}
                              {exclusions && (
                                <span>
                                  {(size || patch || tier || customName || customNumber) ? " · " : ""}
                                  לא: {exclusions.length > 20 ? `${exclusions.slice(0, 20)}…` : exclusions}
                                </span>
                              )}
                            </p>
                          )}
                          <div className="mt-1 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuantityAt(index, quantity - 1)}
                              className="h-7 w-7 rounded border border-gray-200 text-gray-600 hover:bg-gray-200"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="min-w-[1.5rem] text-center text-sm text-gray-900">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantityAt(index, quantity + 1)}
                              className="h-7 w-7 rounded border border-gray-200 text-gray-600 hover:bg-gray-200"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ₪{lineTotal.toFixed(2)}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeItemAt(index)}
                            className="mt-1 text-xs text-red-600 hover:text-red-700"
                            aria-label={`Remove ${jersey.title}`}
                          >
                            הסר
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <div className="mb-3 flex justify-between text-gray-600">
                  <span>סה״כ ({totalItems} פריטים)</span>
                  <span className="font-semibold text-gray-900">
                    ₪{subtotal.toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full rounded-lg bg-gray-900 py-3 text-center font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                >
                  לתשלום
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
