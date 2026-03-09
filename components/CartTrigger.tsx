"use client";

import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";

export function CartTrigger() {
  const { totalItems, toggleCart } = useCart();

  return (
    <motion.button
      type="button"
      onClick={toggleCart}
      className="relative rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-gray-700 transition hover:border-gray-300 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
      aria-label={totalItems > 0 ? `פתח עגלה (${totalItems} פריטים)` : "פתח עגלה"}
      whileTap={{ scale: 0.96 }}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-[10px] font-medium text-white">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </motion.button>
  );
}
