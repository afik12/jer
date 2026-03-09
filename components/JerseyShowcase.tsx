"use client";

import { useMemo } from "react";
import { JerseyCard } from "./JerseyCard";
import type { Jersey } from "@/types/jersey";
import type { DecadeId } from "@/types/jersey";

interface JerseyShowcaseProps {
  jerseys: Jersey[];
  filterDecade?: DecadeId;
  className?: string;
}

export function JerseyShowcase({
  jerseys,
  filterDecade,
  className = "",
}: JerseyShowcaseProps) {
  const filtered = useMemo(() => {
    if (!filterDecade) return jerseys;
    return jerseys.filter((j) => j.decade === filterDecade);
  }, [jerseys, filterDecade]);

  if (filtered.length === 0) {
    return (
      <div className={`py-12 text-center text-zinc-500 ${className}`}>
        <p>No jerseys in this era yet.</p>
      </div>
    );
  }

  return (
    <section
      className={`space-y-8 sm:space-y-10 ${className}`}
      aria-label="Jersey catalog"
    >
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {filtered.map((jersey, i) => (
          <li key={jersey.id}>
            <JerseyCard jersey={jersey} index={i} />
          </li>
        ))}
      </ul>
    </section>
  );
}
