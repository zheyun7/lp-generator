"use client";

import { motion } from "framer-motion";
import type { Step } from "@/lib/types";
import type { ColorTheme } from "@/lib/colors";
import { getThemeStyles } from "@/lib/colors";

interface HowItWorksSectionProps {
  steps: Step[];
  colorTheme: ColorTheme;
}

const DEFAULT_STEPS: Step[] = [
  {
    step: 1,
    title: "Connect Your Tools",
    description:
      "Link to your existing apps with one-click integrations. We securely authenticate and sync your data in real time.",
  },
  {
    step: 2,
    title: "Build Your Flow",
    description:
      "Use the visual builder to create workflows, or let AI generate one from a simple description of what you need.",
  },
  {
    step: 3,
    title: "Automate & Scale",
    description:
      "Activate your workflow and watch it run automatically. Monitor performance, iterate, and scale across your entire organization.",
  },
];

export default function HowItWorksSection({
  steps,
  colorTheme,
}: HowItWorksSectionProps) {
  const displaySteps =
    steps && steps.length > 0 ? steps : DEFAULT_STEPS;
  const themeStyle = getThemeStyles(colorTheme);

  return (
    <section
      id="how-it-works"
      className="relative bg-white transition-colors dark:bg-slate-950"
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
              How It Works
            </h2>
          </motion.div>

          {/* Steps */}
          <div className="grid gap-8 md:grid-cols-3">
            {displaySteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94] as const,
                }}
              >
                {/* Step number */}
                <div
                  className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ring-1"
                  style={{
                    backgroundColor: "rgb(var(--primary-rgb) / 0.1)",
                    borderColor: "rgb(var(--primary-rgb) / 0.2)",
                  }}
                >
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "var(--primary-light)" }}
                  >
                    {step.step}
                  </span>
                </div>
                {/* Connector line (desktop) */}
                {index < displaySteps.length - 1 && (
                  <div
                    className="absolute left-[calc(50%+40px)] top-8 hidden h-px w-[calc(100%-80px)] bg-gradient-to-r to-transparent md:block"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgb(var(--primary-rgb) / 0.4), transparent)`,
                    }}
                  />
                )}
                <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
