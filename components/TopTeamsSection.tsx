"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { TOP_TEAMS } from "@/lib/top-teams";

interface TopTeamsSectionProps {
  selectedClub: string | null;
  onSelectClub: (clubName: string | null) => void;
}

/**
 * Horizontal scrollable row of top team quick-links.
 * Clicking filters the product grid by that team's jerseys.
 */
export function TopTeamsSection({ selectedClub, onSelectClub }: TopTeamsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-8" aria-label="Top Teams">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-white/60 mb-6">
          Top Teams
        </h2>
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <button
            type="button"
            onClick={() => onSelectClub(null)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
              selectedClub === null
                ? "bg-white text-black"
                : "bg-white/10 text-white/90 hover:bg-white/15"
            }`}
          >
            All
          </button>
          {TOP_TEAMS.map((team) => {
            const isSelected = selectedClub === team.clubName;
            return (
              <motion.button
                key={team.id}
                type="button"
                onClick={() => onSelectClub(isSelected ? null : team.clubName)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                  isSelected
                    ? "border-white bg-white text-black"
                    : "border-white/25 bg-white/5 text-white/90 hover:border-white/40 hover:bg-white/10"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {team.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
