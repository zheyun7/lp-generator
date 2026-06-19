import { Sparkles, Zap, Shield, Globe, Code, BarChart3 } from "lucide-react";
import type { Feature } from "@/lib/types";
import type { ColorTheme } from "@/lib/colors";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Zap,
  Shield,
  Globe,
  Code,
  BarChart3,
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

  return (
    <section className="relative bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-20 md:py-28">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
            <h2 className="text-3xl font-bold text-gray-200 md:text-4xl">
              Features
            </h2>
          </div>

          {/* Feature grid */}
          <div className="grid overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-3 *:relative *:border-b *:border-r *:border-gray-800 *:p-8 md:*:p-10">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Sparkles;
              return (
                <article key={index} className="group">
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-${colorTheme}-500/10 ring-1 ring-${colorTheme}-500/20`}
                  >
                    <Icon className={`h-6 w-6 text-${colorTheme}-400`} />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-200">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
