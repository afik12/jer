"use client";

import { useRef } from "react";
import { ProductCard } from "./ProductCard";
import type { Jersey } from "@/types/jersey";

interface ProductCarouselProps {
  title: string;
  jerseys: Jersey[];
  /** Optional aria label for the section */
  ariaLabel?: string;
}

const SCROLL_STEP = 280;

/**
 * Horizontal scrolling product carousel with arrow buttons. Touch/swipe on mobile, arrows + scroll on desktop.
 */
export function ProductCarousel({ title, jerseys, ariaLabel }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "start" | "end") => {
    const el = scrollRef.current;
    if (!el) return;
    // RTL: כיוון הפוך — מתחלפים
    const step = direction === "end" ? SCROLL_STEP : -SCROLL_STEP;
    el.scrollBy({ left: step, behavior: "smooth" });
  };

  if (jerseys.length === 0) return null;

  return (
    <section
      className="w-full bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
      aria-label={ariaLabel ?? title}
    >
      <div className="mx-auto max-w-7xl relative">
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
            {title}
          </h2>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => scroll("end")}
              className="rounded-full p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              aria-label="גלול שמאלה"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("start")}
              className="rounded-full p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              aria-label="גלול ימינה"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="overflow-x-auto overflow-y-visible scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          <ul className="flex items-stretch gap-4 sm:gap-5 lg:gap-6" style={{ width: "max-content", minWidth: "100%" }}>
            {jerseys.map((jersey, i) => (
              <li key={jersey.id} className="flex w-[180px] shrink-0 sm:w-[210px] lg:w-[260px]">
                <ProductCard jersey={jersey} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
