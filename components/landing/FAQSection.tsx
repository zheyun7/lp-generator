"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import type { FAQItem } from "@/lib/types";

interface FAQSectionProps {
  faq: FAQItem[];
}

export default function FAQSection({ faq }: FAQSectionProps) {
  if (!faq || faq.length === 0) return null;

  return (
    <section
      id="faq"
      className="relative bg-white transition-colors dark:bg-slate-950"
    >
      {/* Top gradient divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="py-20 md:py-28">
          {/* Section header */}
          <motion.div
            className="pb-14 text-center md:pb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
          </motion.div>

          {/* FAQ list */}
          <div className="space-y-4">
            {faq.map((item, index) => (
              <FAQItemCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItemCard({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="rounded-xl border border-slate-200 bg-slate-50 transition-colors dark:border-slate-800 dark:bg-slate-900/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
    >
      <button
        className="flex w-full items-center justify-between px-6 py-5 text-left text-base font-medium text-slate-900 transition-colors hover:text-indigo-500 dark:text-white dark:hover:text-indigo-400"
        onClick={() => setOpen(!open)}
      >
        {item.question}
        <ChevronDown
          className={`ml-4 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {item.answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
