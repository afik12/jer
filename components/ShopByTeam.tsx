"use client";

import Link from "next/link";
import { TOP_TEAMS } from "@/lib/top-teams";

/** Map team id to league slug for navigation */
const TEAM_TO_LEAGUE: Record<string, string> = {
  barcelona: "la-liga",
  "real-madrid": "la-liga",
  "man-city": "premier-league",
  "ac-milan": "serie-a",
  liverpool: "premier-league",
  juventus: "serie-a",
};

/**
 * Shop by Team quick links (chips) — FC Barcelona, Real Madrid, Man City, etc. Classic e-commerce.
 */
export function ShopByTeam() {
  return (
    <section className="w-full border-t border-gray-200 bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12" aria-label="קניה לפי קבוצה">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-5 text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
          קניה לפי קבוצה
        </h2>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {TOP_TEAMS.map((team) => {
            const href = `/leagues/${TEAM_TO_LEAGUE[team.id] ?? "premier-league"}`;
            return (
              <Link
                key={team.id}
                href={href}
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              >
                {team.label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
