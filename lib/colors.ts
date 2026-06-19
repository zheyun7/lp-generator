export type ColorTheme = "indigo" | "violet" | "blue" | "rose" | "orange";

type ColorMap = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  glow: string;
  gradientFrom: string;
  gradientTo: string;
  buttonHover: string;
};

export const colorThemes: Record<ColorTheme, ColorMap> = {
  indigo: {
    primary: "indigo-500",
    primaryLight: "indigo-400",
    primaryDark: "indigo-600",
    glow: "indigo-500",
    gradientFrom: "from-indigo-600",
    gradientTo: "to-indigo-500",
    buttonHover: "bg-[length:100%_150%]",
  },
  violet: {
    primary: "violet-500",
    primaryLight: "violet-400",
    primaryDark: "violet-600",
    glow: "violet-500",
    gradientFrom: "from-violet-600",
    gradientTo: "to-violet-500",
    buttonHover: "bg-[length:100%_150%]",
  },
  blue: {
    primary: "blue-500",
    primaryLight: "blue-400",
    primaryDark: "blue-600",
    glow: "blue-500",
    gradientFrom: "from-blue-600",
    gradientTo: "to-blue-500",
    buttonHover: "bg-[length:100%_150%]",
  },
  rose: {
    primary: "rose-500",
    primaryLight: "rose-400",
    primaryDark: "rose-600",
    glow: "rose-500",
    gradientFrom: "from-rose-600",
    gradientTo: "to-rose-500",
    buttonHover: "bg-[length:100%_150%]",
  },
  orange: {
    primary: "orange-500",
    primaryLight: "orange-400",
    primaryDark: "orange-600",
    glow: "orange-500",
    gradientFrom: "from-orange-600",
    gradientTo: "to-orange-500",
    buttonHover: "bg-[length:100%_150%]",
  },
};

export function getColorClasses(theme: ColorTheme) {
  const c = colorThemes[theme];
  return {
    btn: `bg-linear-to-t ${c.gradientFrom} ${c.gradientTo} bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:${c.buttonHover}`,
    btnOutline: `border border-${c.primary} text-${c.primary}`,
    badge: `bg-${c.primary}/10 text-${c.primaryLight}`,
    icon: `fill-${c.primary} text-${c.primaryLight}`,
    glow: `border-${c.glow}`,
    ring: `ring-${c.primary}/20`,
  };
}
