import { Check } from "lucide-react";
import type { PricingPlan } from "@/lib/types";
import type { ColorTheme } from "@/lib/colors";

interface PricingSectionProps {
  pricing: PricingPlan[];
  colorTheme: ColorTheme;
}

export default function PricingSection({
  pricing,
  colorTheme,
}: PricingSectionProps) {
  if (!pricing || pricing.length === 0) return null;

  return (
    <section className="relative bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-20 md:py-28">
          <div className="mx-auto max-w-3xl pb-14 text-center md:pb-20">
            <h2 className="text-3xl font-bold md:text-4xl">Pricing</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {pricing.map((tier, index) => (
              <div
                key={index}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  tier.highlighted
                    ? `border-${colorTheme}-500/50 bg-${colorTheme}-500/5 ring-1 ring-${colorTheme}-500/20 shadow-xl`
                    : "border-gray-200 bg-white shadow-sm"
                }`}
              >
                {tier.highlighted && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-${colorTheme}-500 px-4 py-1 text-xs font-semibold text-white`}
                  >
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="mb-1 text-xl font-semibold">{tier.name}</h3>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                </div>
                <ul className="mb-8 flex-1 space-y-3">
                  {tier.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 text-${colorTheme}-500`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`inline-flex h-9 w-full items-center justify-center rounded-lg text-sm font-medium transition-all ${
                    tier.highlighted
                      ? `bg-${colorTheme}-500 text-white hover:bg-${colorTheme}-400`
                      : `border border-gray-200 bg-white text-gray-700 hover:bg-gray-50`
                  }`}
                >
                  {tier.highlighted ? "Start Free Trial" : "Get Started"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
