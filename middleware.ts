import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourapp.com";

  let mainDomain: string;
  try {
    mainDomain = new URL(siteUrl).hostname;
  } catch {
    mainDomain = "yourapp.com";
  }

  // Check if this is a subdomain (e.g. myslug.yourapp.com)
  if (
    hostname !== mainDomain &&
    hostname.endsWith("." + mainDomain)
  ) {
    const slug = hostname.replace(`.${mainDomain}`, "");

    // Skip if slug is empty or "www"
    if (!slug || slug === "www") {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = `/p/${slug}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
