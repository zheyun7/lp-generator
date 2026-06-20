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

export interface Step {
  step: number;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "Twitter" | "GitHub" | "LinkedIn";
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
