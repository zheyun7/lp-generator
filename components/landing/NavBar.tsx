"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import type { ColorTheme } from "@/lib/colors";
import { getThemeStyles } from "@/lib/colors";

interface NavBarProps {
  productName: string;
  colorTheme: ColorTheme;
  navItems?: { label: string; href: string }[];
}

const DEFAULT_NAV = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function NavBar({
  productName,
  colorTheme,
  navItems,
}: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const themeStyle = getThemeStyles(colorTheme);
  const links = navItems && navItems.length > 0 ? navItems : DEFAULT_NAV;

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-slate-200 bg-white/80 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/80"
          : "bg-transparent"
      }`}
      style={themeStyle}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg font-bold text-slate-900 transition-colors hover:opacity-80 dark:text-white"
          >
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {productName.charAt(0).toUpperCase()}
            </span>
            {productName}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className="ml-2 rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            )}
            <a
              href="#cta"
              className="ml-3 inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "var(--primary)" }}
            >
              Get Started
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <button
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="border-t border-slate-200 bg-white pb-4 pt-2 dark:border-slate-800 dark:bg-slate-950 md:hidden">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 px-3">
              <a
                href="#cta"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-9 w-full items-center justify-center rounded-lg text-sm font-medium text-white"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Get Started
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
