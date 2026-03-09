"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/categories";

/**
 * Row of lookbook-style category blocks (rounded squares with model photos).
 * Premier League, La Liga, Serie A, Retro, Kids.
 * Labels below; hover: accent border + subtle depth.
 */
export function CategoryCircles() {
  return (
    <section
      className="w-full bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
      aria-label="קניה לפי קטגוריה"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide sm:gap-5 md:gap-6 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group flex shrink-0 flex-col items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 lg:shrink"
            >
              <motion.div
                className="relative w-full max-w-[160px] overflow-hidden rounded-2xl border-2 border-transparent shadow-md transition-shadow sm:max-w-[180px] lg:max-w-none"
                style={{ aspectRatio: "4/5" }}
                whileHover={{
                  boxShadow: `0 12px 24px -8px ${cat.accent}30, 0 4px 12px -4px rgba(0,0,0,0.08)`,
                  borderColor: cat.accent,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={cat.imageUrl}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </motion.div>
              <span className="text-center text-xs font-medium text-gray-700 group-hover:text-gray-900 sm:text-sm">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
