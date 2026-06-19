import { nanoid } from "nanoid";

export function generateSlug(productName: string): string {
  const shortName = productName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 20);

  const id = nanoid(6);
  return `${shortName}-${id}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
