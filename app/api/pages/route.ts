import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { generateSlug } from "@/lib/utils";
import type { CreatePageInput } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body: CreatePageInput = await request.json();

    // Validate required fields
    if (!body.productName || !body.tagline || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields: productName, tagline, description" },
        { status: 400 }
      );
    }

    const slug = generateSlug(body.productName);

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("pages")
      .insert({
        slug,
        product_name: body.productName,
        tagline: body.tagline,
        description: body.description,
        color_theme: body.colorTheme || "indigo",
        cta_text: body.ctaText || "Get Started",
        cta_url: body.ctaUrl || "#",
        features: body.features || [],
        pricing: body.pricing || [],
        faq: body.faq || [],
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to create page" },
        { status: 500 }
      );
    }

    return NextResponse.json({ slug, url: `/p/${slug}` }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
