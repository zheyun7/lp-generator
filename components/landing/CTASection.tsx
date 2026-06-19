import { ArrowRight } from "lucide-react";
import type { ColorTheme } from "@/lib/colors";

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
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl text-center shadow-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gray-900">
          {/* Glow */}
          <div
            className={`absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2`}
            aria-hidden="true"
          >
            <div
              className={`h-56 w-[480px] rounded-full border-[20px] border-${colorTheme}-500 blur-3xl`}
            />
          </div>

          <div className="px-4 py-12 md:px-12 md:py-20">
            <h2 className="mb-6 text-3xl font-bold text-gray-200 md:mb-12 md:text-4xl">
              Ready to try {productName}?
            </h2>
            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
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
    </section>
  );
}
