import { ArrowRight } from "lucide-react";
import type { ColorTheme } from "@/lib/colors";

interface HeroSectionProps {
  productName: string;
  tagline: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  colorTheme: ColorTheme;
}

export default function HeroSection({
  productName,
  tagline,
  description,
  ctaText,
  ctaUrl,
  colorTheme,
}: HeroSectionProps) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-16 pt-32 md:pb-24 md:pt-44">
          <div className="pb-12 text-center md:pb-16">
            {/* Badge */}
            <div className="mb-6 inline-flex border-y [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]">
              <span className="-mx-0.5 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600 ring-1 ring-slate-200">
                {productName}
              </span>
            </div>

            {/* Title */}
            <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              {tagline.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < tagline.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h1>

            {/* Description */}
            <div className="mx-auto max-w-3xl">
              <p className="mb-8 text-lg text-gray-600">{description}</p>
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center sm:gap-4">
                <a
                  className={`btn group mb-4 w-full bg-linear-to-t from-${colorTheme}-600 to-${colorTheme}-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto`}
                  href={ctaUrl || "#"}
                >
                  <span className="relative inline-flex items-center">
                    {ctaText || "Get Started"}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
