"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ColorTheme } from "@/lib/colors";
import { getThemeStyles } from "@/lib/colors";

interface CTASectionProps {
  ctaText: string;
  ctaUrl: string;
  productName: string;
  colorTheme: ColorTheme;
}

export default function CTASection({
  ctaText,
  ctaUrl,
  productName,
  colorTheme,
}: CTASectionProps) {
  const themeStyle = getThemeStyles(colorTheme);

  return (
    <section
      className="relative bg-slate-50 transition-colors dark:bg-slate-900"
      style={themeStyle}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-20 md:py-28">
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-white px-6 py-16 text-center shadow-2xl transition-colors dark:bg-slate-950 md:px-12 md:py-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            {/* Glow */}
            <div
              className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2"
              aria-hidden="true"
            >
              <div
                className="h-56 w-[480px] rounded-full border-[20px] blur-3xl opacity-20"
                style={{ borderColor: "var(--primary)" }}
              />
            </div>

            <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl lg:text-5xl">
              Ready to try {productName}?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Join thousands of teams already using {productName} to automate
              their workflows.
            </p>
            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <a
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-6 text-sm font-medium text-white transition-all hover:opacity-90 sm:w-auto"
                style={{ backgroundColor: "var(--primary)" }}
                href={ctaUrl || "#"}
              >
                <span className="relative inline-flex items-center">
                  {ctaText || "Get Started"}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
