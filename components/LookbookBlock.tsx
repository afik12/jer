"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Jersey } from "@/types/jersey";

interface LookbookBlockProps {
  jersey: Jersey;
  index: number;
}

/**
 * Full-bleed editorial block: one jersey per viewport-sized section.
 * Zara/Castro style: large imagery, minimal typography, hover accent from jersey theme.
 */
export function LookbookBlock({ jersey, index }: LookbookBlockProps) {
  const gradient =
    jersey.theme.secondary
      ? `linear-gradient(135deg, ${jersey.theme.primary}, ${jersey.theme.secondary})`
      : jersey.theme.primary;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
      className="group relative min-h-[85vh] w-full overflow-hidden bg-black"
    >
      <Link
        href={`/products/${jersey.id}`}
        className="block h-full min-h-[85vh] w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
      >
        {/* Full-bleed image area — edge-to-edge */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-out group-hover:scale-[1.02]"
          style={{ background: gradient }}
        />
        {/* Subtle accent glow on hover — dynamic per jersey */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 0 1px ${jersey.theme.primary}40, 0 0 80px ${jersey.theme.primary}15`,
          }}
        />
        {/* Minimal caption: bottom-left, fashion editorial style */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-10 lg:p-12">
          <div className="mx-auto max-w-7xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
              {jersey.club}
            </p>
            <p className="mt-1 text-2xl font-light tracking-tight text-white md:text-3xl lg:text-4xl">
              {jersey.title}
            </p>
            <p className="mt-2 text-sm font-medium text-white/90">
              ₪{jersey.price?.toFixed(2) ?? "—"}
            </p>
          </div>
        </div>
      </Link>
    </motion.section>
  );
}
