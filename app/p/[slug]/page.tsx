import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSupabase } from "@/lib/supabase";
import type { PageData } from "@/lib/types";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import LandingFooter from "@/components/landing/Footer";
import Link from "next/link";

async function getPageData(slug: string): Promise<PageData | null> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      slug: data.slug,
      productName: data.product_name,
      tagline: data.tagline,
      description: data.description,
      colorTheme: data.primary_color || "indigo",
      ctaText: data.cta_text || "Get Started",
      ctaUrl: data.cta_url || "#",
      features: data.features || [],
      pricing: data.pricing || [],
      faq: data.faq || [],
      created_at: data.created_at,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageData(slug);

  if (!page) {
    return { title: "Page Not Found" };
  }

  return {
    title: `${page.productName} — ${page.tagline}`,
    description: page.description,
    openGraph: {
      title: page.productName,
      description: page.tagline,
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageData(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <HeroSection
        productName={page.productName}
        tagline={page.tagline}
        description={page.description}
        ctaText={page.ctaText}
        ctaUrl={page.ctaUrl}
        colorTheme={page.colorTheme}
      />
      <FeaturesSection
        features={page.features}
        colorTheme={page.colorTheme}
      />
      <PricingSection
        pricing={page.pricing}
        colorTheme={page.colorTheme}
      />
      <FAQSection faq={page.faq} />
      <CTASection
        ctaText={page.ctaText}
        ctaUrl={page.ctaUrl}
        productName={page.productName}
        colorTheme={page.colorTheme}
      />
      <LandingFooter productName={page.productName} />

      {/* Powered by badge */}
      <div className="fixed bottom-4 right-4 z-40">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/90 px-3 py-1.5 text-xs text-gray-500 shadow-sm backdrop-blur-sm transition-colors hover:text-gray-700 hover:shadow-md"
        >
          Powered by Landing Page Generator
        </Link>
      </div>
    </>
  );
}
