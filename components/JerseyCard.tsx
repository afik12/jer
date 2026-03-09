"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Jersey } from "@/types/jersey";

interface JerseyCardProps {
  jersey: Jersey;
  index?: number;
}

export function JerseyCard({ jersey, index = 0 }: JerseyCardProps) {
  const gradient =
    jersey.theme.secondary
      ? `linear-gradient(135deg, ${jersey.theme.primary}, ${jersey.theme.secondary})`
      : jersey.theme.primary;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group"
    >
      <Link
        href={`/products/${jersey.id}`}
        className="block overflow-hidden rounded-2xl border border-locker-border bg-locker-panel transition-colors hover:border-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-locker-dark"
      >
        <div className="relative aspect-[3/4] min-h-[280px] overflow-hidden sm:min-h-[320px]">
          {/* Placeholder / image area with team gradient */}
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{ background: gradient }}
          />
          {/* Optional overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {/* Era badge */}
          <div
            className="absolute left-4 top-4 rounded-lg px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
          >
            {jersey.era}
          </div>
          {/* Price */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <span className="text-xl font-bold text-white drop-shadow-lg">
              ₪{jersey.price?.toFixed(2) ?? "—"}
            </span>
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="text-lg font-semibold text-zinc-100 transition-colors group-hover:text-white sm:text-xl">
            {jersey.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-500">{jersey.club}</p>
          {jersey.story && (
            <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
              {jersey.story}
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
