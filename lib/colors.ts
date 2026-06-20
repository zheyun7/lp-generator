export type ColorTheme = "indigo" | "violet" | "blue" | "rose" | "orange";

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryBg: string;
  primaryRgb: string;
}

export const colorThemes: Record<ColorTheme, ThemeColors> = {
  indigo: {
    primary: "#6366f1",
    primaryLight: "#818cf8",
    primaryDark: "#4f46e5",
    primaryBg: "#eef2ff",
    primaryRgb: "99 102 241",
  },
  violet: {
    primary: "#8b5cf6",
    primaryLight: "#a78bfa",
    primaryDark: "#7c3aed",
    primaryBg: "#f5f3ff",
    primaryRgb: "139 92 246",
  },
  blue: {
    primary: "#3b82f6",
    primaryLight: "#60a5fa",
    primaryDark: "#2563eb",
    primaryBg: "#eff6ff",
    primaryRgb: "59 130 246",
  },
  rose: {
    primary: "#f43f5e",
    primaryLight: "#fb7185",
    primaryDark: "#e11d48",
    primaryBg: "#fff1f2",
    primaryRgb: "244 63 94",
  },
  orange: {
    primary: "#f97316",
    primaryLight: "#fb923c",
    primaryDark: "#ea580c",
    primaryBg: "#fff7ed",
    primaryRgb: "249 115 22",
  },
};

/**
 * Returns CSS custom properties as a style object for a given color theme.
 * Usage: <div style={getThemeStyles("indigo")} className="bg-[var(--primary)]">
 */
export function getThemeStyles(theme: ColorTheme): Record<string, string> {
  const c = colorThemes[theme];
  return {
    "--primary": c.primary,
    "--primary-light": c.primaryLight,
    "--primary-dark": c.primaryDark,
    "--primary-bg": c.primaryBg,
    "--primary-rgb": c.primaryRgb,
  };
}
