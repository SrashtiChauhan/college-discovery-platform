"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-lg font-bold text-white shadow-lg">
            🎓
          </div>

          <div>
            <h1 className="text-base font-bold tracking-tight text-zinc-900 md:text-lg">
              College Discovery
            </h1>

            <p className="text-xs text-zinc-500">
              Smart Decision Platform
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 rounded-full border border-zinc-200 bg-white/70 p-2 shadow-sm md:flex">

          <Link
            href="/colleges"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-blue-50 hover:text-blue-700"
          >
            Colleges
          </Link>

          <Link
            href="/compare"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-blue-50 hover:text-blue-700"
          >
            Compare
          </Link>

          <Link
            href="/predictor"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700"
          >
            Predictor
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm md:hidden"
        >
          <span className="text-xl">
            {mobileMenuOpen ? "✕" : "☰"}
          </span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">

            <Link
              href="/colleges"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-zinc-100"
            >
              Colleges
            </Link>

            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-zinc-100"
            >
              Compare
            </Link>

            <Link
              href="/predictor"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Predictor
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}