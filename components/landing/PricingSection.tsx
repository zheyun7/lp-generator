"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import type { PricingPlan } from "@/lib/types";
import type { ColorTheme } from "@/lib/colors";
import { getThemeStyles } from "@/lib/colors";

interface PricingSectionProps {
  pricing: PricingPlan[];
  colorTheme: ColorTheme;
}

export default function PricingSection({
  pricing,
  colorTheme,
}: PricingSectionProps) {
  if (!pricing || pricing.length === 0) return null;

  const themeStyle = getThemeStyles(colorTheme);

  return (
    <section
      id="pricing"
      className="relative bg-slate-50 transition-colors dark:bg-slate-900"
      style={themeStyle}
    >
      {/* Top gradient divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-20 md:py-28">
          {/* Section header */}
          <motion.div
            className="mx-auto max-w-3xl pb-14 text-center md:pb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl lg:text-5xl">
              Pricing
            </h2>
          </motion.div>

          {/* Pricing cards */}
          <div className="grid gap-8 lg:grid-cols-3">
            {pricing.map((tier, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col rounded-2xl border p-8 transition-colors"
                style={
                  tier.highlighted
                    ? {
                        borderColor: "rgb(var(--primary-rgb) / 0.5)",
                        backgroundColor: "rgb(var(--primary-rgb) / 0.05)",
                        boxShadow: "0 0 0 1px rgb(var(--primary-rgb) / 0.2)",
                      }
                    : {
                        borderColor: "rgb(226 232 240)",
                      }
                }
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94] as const,
                }}
              >
                {tier.highlighted && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="mb-1 text-xl font-semibold text-slate-900 dark:text-white">
                    {tier.name}
                  </h3>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    {tier.price}
                  </span>
                </div>
                <ul className="mb-8 flex-1 space-y-3">
                  {tier.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <span style={{ color: "var(--primary-light)" }}>
                        <Check className="mt-0.5 h-4 w-4 shrink-0" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="inline-flex h-10 w-full items-center justify-center rounded-lg text-sm font-medium transition-all"
                  style={
                    tier.highlighted
                      ? {
                          backgroundColor: "var(--primary)",
                          color: "white",
                        }
                      : {
                          border: "1px solid rgb(203 213 225)",
                          backgroundColor: "white",
                          color: "rgb(51 65 85)",
                        }
                  }
                >
                  {tier.highlighted ? "Start Free Trial" : "Get Started"}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
