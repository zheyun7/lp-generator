"use client";

import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import type { ColorTheme } from "@/lib/colors";
import { getThemeStyles } from "@/lib/colors";

interface HeroSectionProps {
  productName: string;
  tagline: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  colorTheme: ColorTheme;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const, delay },
});

export default function HeroSection({
  productName,
  tagline,
  description,
  ctaText,
  ctaUrl,
  colorTheme,
}: HeroSectionProps) {
  const themeStyle = getThemeStyles(colorTheme);

  return (
    <section className="relative overflow-hidden" style={themeStyle}>
      {/* Background glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div
          className="h-[600px] w-[800px] rounded-full opacity-20 blur-[120px]"
          style={{ backgroundColor: "var(--primary)" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-16 pt-32 md:pb-24 md:pt-44">
          {/* Badge */}
          <motion.div className="mb-8 flex justify-center" {...fadeUp(0)}>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium ring-1 ring-inset"
              style={{
                backgroundColor: "rgb(var(--primary-rgb) / 0.1)",
                color: "var(--primary-light)",
                borderColor: "rgb(var(--primary-rgb) / 0.2)",
              }}
            >
              {productName}
            </span>
          </motion.div>

          {/* Title */}
          <motion.div className="pb-8 text-center md:pb-12" {...fadeUp(0.15)}>
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-7xl">
              {tagline.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < tagline.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h1>
          </motion.div>

          {/* Description + CTAs */}
          <motion.div className="mx-auto max-w-3xl" {...fadeUp(0.3)}>
            <p className="mb-10 text-center text-lg text-slate-600 dark:text-slate-400 md:text-xl">
              {description}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={ctaUrl || "#"}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-6 text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "var(--primary)" }}
              >
                {ctaText || "Get Started"}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#features"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-6 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <Play className="h-4 w-4" />
                See How It Works
              </a>
            </div>
          </motion.div>

          {/* Code terminal preview */}
          <motion.div
            className="mx-auto mt-16 max-w-3xl"
            {...fadeUp(0.5)}
          >
            <div className="relative rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-2xl transition-colors dark:border-slate-700/50 dark:bg-slate-900">
              {/* Fake title bar */}
              <div className="mb-6 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-slate-400 dark:text-slate-500">
                  {productName.toLowerCase().replace(/\s+/g, "-")}-cli
                </span>
              </div>
              {/* Code lines */}
              <div className="space-y-1.5 font-mono text-sm">
                <p className="text-slate-700 dark:text-slate-400">
                  <span style={{ color: "var(--primary)" }}>$</span>{" "}
                  {productName.toLowerCase().replace(/\s+/g, "-")} init
                  my-project
                </p>
                <p className="text-green-600/80 dark:text-green-400/80">
                  ✓ Project scaffolded
                </p>
                <p className="text-slate-700 dark:text-slate-400">
                  <span style={{ color: "var(--primary)" }}>$</span>{" "}
                  {productName.toLowerCase().replace(/\s+/g, "-")} connect
                  --with slack,github,notion
                </p>
                <p className="text-green-600/80 dark:text-green-400/80">
                  ✓ 3 integrations activated
                </p>
                <p className="text-slate-700 dark:text-slate-400">
                  <span style={{ color: "var(--primary)" }}>$</span>{" "}
                  {productName.toLowerCase().replace(/\s+/g, "-")} deploy --env
                  production
                </p>
                <p className="text-slate-500">
                  <span
                    className="animate-pulse"
                    style={{ color: "var(--primary-light)" }}
                  >
                    ▌
                  </span>{" "}
                  Deploying...
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
