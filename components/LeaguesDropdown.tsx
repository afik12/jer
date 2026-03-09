"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LEAGUES } from "@/lib/leagues";

interface LeaguesDropdownProps {
  /** When true, render inline (e.g. inside mobile menu) instead of mega-menu */
  inline?: boolean;
  onLeagueClick?: () => void;
  /** Controlled open state (used when panel is rendered by parent e.g. Navbar) */
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function LeaguesDropdown({ inline = false, onLeagueClick, isOpen, onOpenChange }: LeaguesDropdownProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isControlled = onOpenChange !== undefined;
  const open = isControlled ? (isOpen ?? false) : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  useEffect(() => {
    if (inline || isControlled) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inline, isControlled, setOpen]);

  if (inline) {
    return (
      <div className="flex flex-col gap-1 py-2">
        <p className="px-3 text-[11px] font-medium uppercase tracking-wider text-gray-500">
          ליגות
        </p>
        {LEAGUES.map((league) => (
          <Link
            key={league.slug}
            href={`/leagues/${league.slug}`}
            onClick={onLeagueClick}
            className="rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
          >
            {league.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        className="text-sm font-medium text-gray-600 transition hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded px-2 py-1"
        aria-expanded={open}
        aria-haspopup="true"
      >
        ליגות
      </button>
      {/* When controlled, panel is rendered by parent (Navbar) so it sits under the nav */}
      {!isControlled && (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              onMouseLeave={() => setOpen(false)}
              className="fixed left-0 right-0 z-40 border-b border-gray-200 bg-white py-8 shadow-lg"
              style={{ top: "6.25rem" }}
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <LeaguesDropdownPanelContent onClose={() => setOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

/** Only leagues that have a logo (no placeholder "R"). */
const LEAGUES_WITH_LOGO = LEAGUES.filter((l) => l.logoUrl);

/** Panel content: grid of league logos. Used inside Navbar (connected) or inside dropdown (fixed). */
export function LeaguesDropdownPanelContent({
  onClose,
  loadImages = true,
}: {
  onClose?: () => void;
  /** When false, logos are not loaded yet (placeholder only). Used for scroll-then-load. */
  loadImages?: boolean;
}) {
  return (
    <div className="grid gap-6 grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
      {LEAGUES_WITH_LOGO.map((league) => (
        <Link
          key={league.slug}
          href={`/leagues/${league.slug}`}
          onClick={onClose}
          className="group flex flex-col items-center gap-2 rounded-xl p-3 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          title={league.label}
        >
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200 group-hover:ring-2 group-hover:ring-gray-300">
            {league.logoUrl && loadImages ? (
              <Image
                src={league.logoUrl}
                alt=""
                fill
                className="object-cover"
                sizes="56px"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-lg font-bold text-gray-500">
                {league.label.charAt(0)}
              </span>
            )}
          </div>
          <span className="sr-only">{league.label}</span>
        </Link>
      ))}
    </div>
  );
}

/** Full panel wrapper for use in Navbar — connected under the nav, no gap */
export function LeaguesDropdownPanel({
  onMouseLeave,
  onClose,
  loadImages = true,
}: {
  onMouseLeave?: () => void;
  onClose?: () => void;
  /** When false, panel content shows placeholders until images are allowed to load. */
  loadImages?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      onMouseLeave={onMouseLeave}
      className="border-t border-gray-200 bg-white py-6"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <LeaguesDropdownPanelContent onClose={onClose} loadImages={loadImages} />
      </div>
    </motion.div>
  );
}
