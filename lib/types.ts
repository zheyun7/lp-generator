export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  highlighted: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PageData {
  id?: string;
  slug: string;
  productName: string;
  tagline: string;
  description: string;
  colorTheme: "indigo" | "violet" | "blue" | "rose" | "orange";
  ctaText: string;
  ctaUrl: string;
  features: Feature[];
  pricing: PricingPlan[];
  faq: FAQItem[];
  created_at?: string;
}

export interface CreatePageInput {
  productName: string;
  tagline: string;
  description: string;
  colorTheme: "indigo" | "violet" | "blue" | "rose" | "orange";
  ctaText: string;
  ctaUrl: string;
  features: Feature[];
  pricing: PricingPlan[];
  faq: FAQItem[];
}
