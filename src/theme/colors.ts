import { CategoryColorsType, ThemeColors } from "@/types";

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
    shadow: "#7b7b7b",
    protein: "#81C784",
    fat: "#FFD54F",
    carbs: "#E57373",
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
    shadow: "#0D0D0D",
    protein: "#81C784",
    fat: "#FFD54F",
    carbs: "#E57373",
  },
};

export const CategoryColors: CategoryColorsType = {
  fruit: {
    background: "#FFB385",
    foreground: "#D84315",
  },
  vegetables: {
    background: "#8BCF9B",
    foreground: "#1B5E20",
  },
  grains: {
    background: "#FFEA8A",
    foreground: "#F9A825",
  },
  "plant-protein": {
    background: "#C7B8F2",
    foreground: "#4527A0",
  },
  "animal-protein": {
    background: "#FFBCA6",
    foreground: "#BF360C",
  },
  dairy: {
    background: "#A9D3FF",
    foreground: "#0D47A1",
  },
  fats: {
    background: "#FFD36B",
    foreground: "#FF6F00",
  },
  sweets: {
    background: "#F7A6C4",
    foreground: "#AD1457",
  },
  "drinks-zero": {
    background: "#B0BEC5",
    foreground: "#263238",
  },
  "drinks-caloric": {
    background: "#E4B7F2",
    foreground: "#6A1B9A",
  },
  fastfood: {
    background: "#C7E8A0",
    foreground: "#33691E",
  },
  misc: {
    background: "#B0BEC5",
    foreground: "#37474F",
  },
} as const;
