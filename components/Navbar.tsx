"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CartTrigger } from "./CartTrigger";
import { LeaguesDropdown, LeaguesDropdownPanel } from "./LeaguesDropdown";

const SCROLL_THRESHOLD = 24;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLeaguesOpen, setIsLeaguesOpen] = useState(false);
  const [leaguesImagesCanLoad, setLeaguesImagesCanLoad] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const headerRef = useRef<HTMLDivElement>(null);

  // Sync search input with URL when on /search page
  useEffect(() => {
    if (pathname === "/search") {
      const q = searchParams.get("q") ?? "";
      setSearchQuery(q);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setIsLeaguesOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // כשנפתח דרופדאון ליגות: גלילה למטה והתמונות מתחילות להיטען יחד — בלי עיכוב
  useEffect(() => {
    if (!isLeaguesOpen) {
      setLeaguesImagesCanLoad(false);
      return;
    }
    setLeaguesImagesCanLoad(true);
    const scrollAmount = 280;
    window.scrollTo({ top: window.scrollY + scrollAmount, behavior: "smooth" });
  }, [isLeaguesOpen]);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.97)",
        borderBottomColor: scrolled ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.06)",
      }}
      transition={{ duration: 0.25 }}
      className="border-b border-gray-200 bg-white/98 backdrop-blur-md"
    >
      <div
        ref={headerRef}
        className="flex flex-col overflow-visible"
        onMouseLeave={() => setIsLeaguesOpen(false)}
      >
        <nav
          className="mx-auto flex h-16 w-full max-w-7xl flex-nowrap items-center gap-4 overflow-visible px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center transition opacity-90 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded overflow-visible"
            aria-label="TheFootyKits - דף הבית"
          >
            <Image
              src="/img/TheFootyKits.png"
              alt="TheFootyKits"
              width={500}
              height={150}
              className="h-24 w-auto sm:h-28 md:h-32 lg:h-36"
              priority
            />
          </Link>

          {/* Desktop: ליגות, נבחרות, רטרו */}
          <div className="hidden shrink-0 items-center gap-6 md:flex">
            <LeaguesDropdown
              isOpen={isLeaguesOpen}
              onOpenChange={setIsLeaguesOpen}
            />
            <Link
              href="/leagues/national-teams"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              נבחרות
            </Link>
            <Link
              href="/leagues/retro"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              רטרו
            </Link>
          </div>

          {/* חיפוש */}
          <div className="hidden min-w-0 flex-1 lg:mx-4 lg:block lg:max-w-md">
            <form action="/search" method="GET" role="search" className="w-full">
              <label htmlFor="nav-search" className="sr-only">חיפוש</label>
              <input
                id="nav-search"
                type="search"
                name="q"
                placeholder="חיפוש חולצות..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-1"
              />
            </form>
          </div>

          <div className="ms-auto flex shrink-0 items-center gap-2">
            <CartTrigger />
          </div>

          {/* Mobile: menu + cart */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <CartTrigger />
          </div>
        </nav>

        {/* ליגות dropdown panel — מחובר ל-navbar, בלי רווח */}
        <AnimatePresence>
            {isLeaguesOpen && (
            <LeaguesDropdownPanel
              loadImages={leaguesImagesCanLoad}
              onMouseLeave={() => setIsLeaguesOpen(false)}
              onClose={() => setIsLeaguesOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-gray-200 bg-white md:hidden"
          >
            <div className="border-b border-gray-100 p-4">
              <form action="/search" method="GET" role="search">
                <input
                  type="search"
                  name="q"
                  placeholder="חיפוש חולצות..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-500"
                  aria-label="חיפוש"
                />
              </form>
            </div>
            <div className="flex flex-col gap-1 px-4 py-4">
              <LeaguesDropdown inline onLeagueClick={() => setMobileMenuOpen(false)} />
              <Link href="/leagues/national-teams" className="rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100">נבחרות</Link>
              <Link href="/leagues/retro" className="rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100">רטרו</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
