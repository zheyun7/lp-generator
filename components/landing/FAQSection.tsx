"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/lib/types";

interface FAQSectionProps {
  faq: FAQItem[];
}

export default function FAQSection({ faq }: FAQSectionProps) {
  if (!faq || faq.length === 0) return null;

  return (
    <section className="relative bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="py-20 md:py-28">
          <div className="pb-14 text-center md:pb-20">
            <h2 className="text-3xl font-bold md:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faq.map((item, index) => (
              <FAQItemCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItemCard({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <button
        className="flex w-full items-center justify-between px-6 py-5 text-left text-base font-medium transition-colors hover:text-gray-900"
        onClick={() => setOpen(!open)}
      >
        {item.question}
        <ChevronDown
          className={`ml-4 h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
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
          <p className="px-6 pb-5 text-sm leading-relaxed text-gray-600">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
