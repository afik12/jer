"use client";

import Link from "next/link";
import { CartTrigger } from "./CartTrigger";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-medium tracking-[0.15em] uppercase text-white/90 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
        >
          The Locker Room
        </Link>
        <CartTrigger />
      </div>
    </header>
  );
}
