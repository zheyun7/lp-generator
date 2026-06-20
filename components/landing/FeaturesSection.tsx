"use client";

import { useRef } from "react";
import {
  Activity,
  Clock,
  PlugZap,
  Sparkles,
  Users,
  Workflow,
  Zap,
  Shield,
  Globe,
  Code,
  BarChart3,
  Palette,
  Layers,
  CreditCard,
  MessageCircle,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Feature } from "@/lib/types";
import type { ColorTheme } from "@/lib/colors";
import { getThemeStyles } from "@/lib/colors";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Workflow,
  Sparkles,
  PlugZap,
  Activity,
  Clock,
  Users,
  Zap,
  Shield,
  Globe,
  Code,
  BarChart3,
  Palette,
  Layers,
  CreditCard,
  MessageCircle,
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      delay: i * 0.1,
    },
  }),
};

interface FeaturesSectionProps {
  features: Feature[];
  colorTheme: ColorTheme;
}

export default function FeaturesSection({
  features,
  colorTheme,
}: FeaturesSectionProps) {
  if (!features || features.length === 0) return null;

  const themeStyle = getThemeStyles(colorTheme);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative bg-slate-50 transition-colors dark:bg-slate-900"
      style={themeStyle}
    >
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
              Features
            </h2>
          </motion.div>

          {/* Feature grid */}
          <motion.div
            style={{ y: parallaxY }}
            className="grid gap-px overflow-hidden rounded-2xl bg-slate-200 transition-colors dark:bg-slate-800 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Sparkles;
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative bg-white p-8 transition-colors hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/50 md:p-10"
                >
                  <div
                    className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 transition-colors group-hover:opacity-80"
                    style={{
                      backgroundColor: "rgb(var(--primary-rgb) / 0.1)",
                      borderColor: "rgb(var(--primary-rgb) / 0.2)",
                      color: "var(--primary-light)",
                    }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
