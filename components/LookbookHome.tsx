"use client";

import type { Jersey } from "@/types/jersey";
import { HeroBanner } from "./HeroBanner";
import { CategoryCircles } from "./CategoryCircles";
import { ProductCarousel } from "./ProductCarousel";

interface LookbookHomeProps {
  newSeasonJerseys: Jersey[];
  worldCupJerseys: Jersey[];
  bestSellersJerseys: Jersey[];
}

/**
 * Home: Hero, category blocks, product carousels only.
 * Data is fetched server-side and passed as props.
 */
export function LookbookHome({
  newSeasonJerseys,
  worldCupJerseys,
  bestSellersJerseys,
}: LookbookHomeProps) {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <HeroBanner />
      <CategoryCircles />
      <ProductCarousel
        title="עונה 25/26"
        jerseys={newSeasonJerseys}
        ariaLabel="חולצות עונה 25/26"
      />
      <section id="mundial" className="scroll-mt-20">
        <ProductCarousel
          title="מונדיאל 2026"
          jerseys={worldCupJerseys}
          ariaLabel="חולצות מונדיאל 2026"
        />
      </section>
      <ProductCarousel
        title="נמכרים ביותר"
        jerseys={bestSellersJerseys}
        ariaLabel="נמכרים ביותר"
      />
    </main>
  );
}
