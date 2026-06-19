import Link from "next/link";
import Logo from "@/components/ui/logo";

interface FooterProps {
  productName: string;
}

export default function LandingFooter({ productName }: FooterProps) {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 border-t py-8 sm:grid-cols-12 md:py-12 [border-image:linear-gradient(to_right,transparent,var(--color-slate-200),transparent)1]">
          {/* Brand column */}
          <div className="space-y-2 sm:col-span-12 lg:col-span-4">
            <Logo />
            <div className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} {productName}. All rights reserved.
            </div>
          </div>

          {/* Link columns */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="#features">
                  Features
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="#pricing">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="#faq">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="#">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="#">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="#">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="#">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="#">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
