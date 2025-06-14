// themes/colors.ts
import { ThemeColors } from "@/types";

export const Colors: Record<"light" | "dark", ThemeColors> = {
  light: {
    /* Core palette */
    primary: "#FF6B81", // Korallrosa
    secondary: "#FFA3B1", // Hellrosa
    accent: "#FF9A6C", // Orange-Pink

    /* Semantic */
    success: "#81C784",
    warning: "#FFD54F",
    destructive: "#E57373",
    info: "#555555",

    /* Typography */
    text: "#222222",
    textForeground: "#FFFFFF",
    textLight: "#AAAAAA",

    /* Surfaces */
    background: "#F0F0F0", // etwas dunkler als Weiß → mehr Kontrast
    foreground: "#FFFFFF",

    /* UI */
    icon: "#555555",
    tabIconDefault: "#AAAAAA",
    tabIconSelected: "#FF6B81",
    border: "#E0E0E0",
    shadow: "#7b7b7b", // dunkler als zuvor
  },

  dark: {
    /* Core palette */
    primary: "#FF6B81",
    secondary: "#FF9BAA",
    accent: "#FF9A6C",

    /* Semantic */
    success: "#81C784",
    warning: "#FFD54F",
    destructive: "#E57373",
    info: "#CCCCCC",

    /* Typography */
    text: "#FAFAFA",
    textForeground: "#FFFFFF",
    textLight: "#777777",

    /* Surfaces */
    background: "#181818", // leichteres Grau statt Tiefschwarz
    foreground: "#242424", // deutlicher Kontrast zur Base-Ebene

    /* UI */
    icon: "#D0D0D0",
    tabIconDefault: "#888888",
    tabIconSelected: "#FF6B81",
    border: "#404040",
    shadow: "#0D0D0D", // dunkler und subtil
  },
};
