"use client";

import Link from "next/link";

const HERO_BG_IMAGE = "/img/Gemini_Generated_Image_uqppo7uqppo7uqpp.png";

/**
 * Classic e-commerce hero promo (jerseyniho-inspired). Background image + text + CTA.
 */
export function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-gray-900">
      <div
        className="flex min-h-[280px] flex-col justify-end bg-cover bg-center bg-no-repeat px-6 py-12 sm:min-h-[320px] sm:px-8 sm:py-16 md:min-h-[360px] md:px-10 lg:px-12"
        style={{
          backgroundImage: `url(${HERO_BG_IMAGE})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent" aria-hidden />
        <div className="relative z-10 flex w-full max-w-7xl justify-start px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-md text-end">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              חדש במלאי
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              קולקציית מונדיאל
            </h2>
            <p className="mt-2 text-sm text-white/80">
              חולצות מועדונים ונבחרות עדכניות. הדפסת שם ומספר בחינם על פריטים נבחרים.
            </p>
            <Link
              href="/#mundial"
              className="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              לקנות עכשיו
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
