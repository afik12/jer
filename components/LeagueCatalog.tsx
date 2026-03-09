"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import type { Jersey } from "@/types/jersey";

type SortOption = "price-asc" | "price-desc" | "name";

interface LeagueCatalogProps {
  jerseys: Jersey[];
  leagueLabel: string;
  leagueDescription?: string;
}

export function LeagueCatalog({
  jerseys,
  leagueLabel,
  leagueDescription,
}: LeagueCatalogProps) {
  const [sort, setSort] = useState<SortOption>("price-asc");
  const [filterOpen, setFilterOpen] = useState(false);
  const [team, setTeam] = useState<string>("all");
  const [size, setSize] = useState<string>("all");
  const [era, setEra] = useState<string>("all");

  const teams = useMemo(() => {
    const set = new Set(jerseys.map((j) => j.club).filter(Boolean));
    return Array.from(set).sort();
  }, [jerseys]);

  const sizes = useMemo(() => {
    const set = new Set(jerseys.flatMap((j) => j.sizes ?? []));
    return Array.from(set).sort();
  }, [jerseys]);

  const eras = useMemo(() => {
    const set = new Set(jerseys.map((j) => j.era).filter(Boolean));
    return Array.from(set).sort();
  }, [jerseys]);

  const filtered = useMemo(() => {
    let list = jerseys.filter((j) => {
      if (team !== "all" && j.club !== team) return false;
      if (size !== "all" && (!j.sizes || !j.sizes.includes(size))) return false;
      if (era !== "all" && j.era !== era) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return (a.price ?? 0) - (b.price ?? 0);
      if (sort === "price-desc") return (b.price ?? 0) - (a.price ?? 0);
      return (a.title ?? "").localeCompare(b.title ?? "");
    });
    return list;
  }, [jerseys, team, size, era, sort]);

  const activeFilters = [team, size, era].filter((v) => v !== "all").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <header className="mb-12 sm:mb-16">
        <h1 className="text-3xl font-light tracking-tight text-white sm:text-4xl">
          {leagueLabel}
        </h1>
        {leagueDescription && (
          <p className="mt-2 text-sm text-white/60">{leagueDescription}</p>
        )}
      </header>

      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setFilterOpen((o) => !o)}
          className="inline-flex w-fit items-center gap-2 rounded-md border border-white/20 bg-black/50 px-3 py-2 text-sm text-white/90 hover:border-white/30 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          aria-expanded={filterOpen}
        >
          סינון
          {activeFilters > 0 && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white/20 px-1.5 text-xs">
              {activeFilters}
            </span>
          )}
        </button>
        <div className="flex items-center gap-2">
          <label htmlFor="league-sort" className="sr-only">
            מיון
          </label>
          <select
            id="league-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-md border border-white/20 bg-black/50 px-3 py-2 text-sm text-white focus:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <option value="price-asc">מחיר: נמוך לגבוה</option>
            <option value="price-desc">מחיר: גבוה לנמוך</option>
            <option value="name">שם א׳–ת׳</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-y border-white/10"
          >
            <div className="grid gap-6 py-6 sm:grid-cols-3">
              <div>
                <label htmlFor="filter-team" className="block text-xs font-medium uppercase tracking-wider text-white/50">
                  קבוצה
                </label>
                <select
                  id="filter-team"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-white/20 bg-black/50 px-3 py-2 text-sm text-white focus:border-white/40 focus:outline-none"
                >
                  <option value="all">הכל</option>
                  {teams.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="filter-size" className="block text-xs font-medium uppercase tracking-wider text-white/50">
                  מידה
                </label>
                <select
                  id="filter-size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-white/20 bg-black/50 px-3 py-2 text-sm text-white focus:border-white/40 focus:outline-none"
                >
                  <option value="all">הכל</option>
                  {sizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="filter-era" className="block text-xs font-medium uppercase tracking-wider text-white/50">
                  עונה
                </label>
                <select
                  id="filter-era"
                  value={era}
                  onChange={(e) => setEra(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-white/20 bg-black/50 px-3 py-2 text-sm text-white focus:border-white/40 focus:outline-none"
                >
                  <option value="all">הכל</option>
                  {eras.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
        {filtered.map((jersey, i) => (
          <li key={jersey.id}>
            <ProductCard jersey={jersey} index={i} />
          </li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="py-16 text-center text-white/50">אין חולצות התואמות את הסינון.</p>
      )}
    </div>
  );
}
