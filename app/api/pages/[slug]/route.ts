import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import type { PageData } from "@/lib/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const pageData: PageData = {
      id: data.id,
      slug: data.slug,
      productName: data.product_name,
      tagline: data.tagline || "",
      description: data.description || "",
      colorTheme: data.primary_color || "indigo",
      ctaText: data.cta_text || "Get Started",
      ctaUrl: data.cta_url || "#",
      features: data.features || [],
      pricing: data.pricing || [],
      faq: data.faq || [],
      created_at: data.created_at,
    };

    return NextResponse.json(pageData);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
