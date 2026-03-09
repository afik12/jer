"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import type { Jersey } from "@/types/jersey";

type SortOption = "price-asc" | "price-desc" | "name";
type FilterOption = "all" | "retro";

interface CatalogSectionProps {
  jerseys: Jersey[];
  id?: string;
  title?: string;
  subtitle?: string;
  defaultFilter?: FilterOption;
}

export function CatalogSection({
  jerseys,
  id = "catalog",
  title = "חנות",
  subtitle,
  defaultFilter = "all",
}: CatalogSectionProps) {
  const [filter, setFilter] = useState<FilterOption>(defaultFilter);
  const [sort, setSort] = useState<SortOption>("price-asc");

  const filtered = useMemo(() => {
    let list = filter === "retro"
      ? jerseys.filter((j) => j.decade === "80s" || j.decade === "90s")
      : [...jerseys];
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return (a.price ?? 0) - (b.price ?? 0);
      if (sort === "price-desc") return (b.price ?? 0) - (a.price ?? 0);
      return (a.title ?? "").localeCompare(b.title ?? "");
    });
    return list;
  }, [jerseys, filter, sort]);

  return (
    <section id={id} className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="filter" className="sr-only">סינון</label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterOption)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            >
              <option value="all">הכל</option>
              <option value="retro">רטרו (שנות 80–90)</option>
            </select>
            <label htmlFor="sort" className="sr-only">מיון</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            >
              <option value="price-asc">מחיר: נמוך לגבוה</option>
              <option value="price-desc">מחיר: גבוה לנמוך</option>
              <option value="name">שם א׳–ת׳</option>
            </select>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {filtered.map((jersey, i) => (
            <li key={jersey.id}>
              <ProductCard jersey={jersey} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
