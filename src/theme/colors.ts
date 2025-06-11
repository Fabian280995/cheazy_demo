// themes/colors.ts
import { ThemeColors } from "@/types";

export const Colors: Record<"light" | "dark", ThemeColors> = {
  light: {
    primary: "#FF6B81", // Korallrosa
    secondary: "#FFA3B1", // Hellrosa (Primary Light)
    accent: "#FF9A6C", // Orange-Pink
    success: "#4CAF50", // Grün
    warning: "#FFC107", // Gelb-Orange
    destructive: "#F44336", // Rot (Error)
    info: "#555555", // Mittelgrau (Text Secondary)

    text: "#222222", // Dunkelgrau (Text Primary)
    textForeground: "#FFFFFF", // Weiß für Buttons / Chips
    textLight: "#AAAAAA", // Hellgrau (Disabled Text)

    background: "#FDFDFD", // Hellgrau-Weiß (Background)
    foreground: "#FFFFFF", // Card / Surface
    icon: "#555555", // Mittelgrau
    tabIconDefault: "#AAAAAA", // Hellgrau
    tabIconSelected: "#FF6B81", // Primary
    border: "#E0E0E0", // Divider
    shadow: "#E0E0E0", // Soft shadow-tone (nur Palette-Color)
  },

  dark: {
    primary: "#FF6B81", // Korallrosa
    secondary: "#FF9BAA", // Rosa-Ton (Primary Light Dark Mode)
    accent: "#FF9A6C", // Orange-Pink
    success: "#81C784", // Hellgrün
    warning: "#FFD54F", // Goldgelb
    destructive: "#E57373", // Hellrot (Error Dark Mode)
    info: "#CCCCCC", // Hellgrau (Text Secondary)

    text: "#FAFAFA", // Fast Weiß (Text Primary)
    textForeground: "#FFFFFF", // Weiß für Buttons / Chips
    textLight: "#777777", // Gedämpftes Grau (Disabled Text)

    background: "#121212", // Dunkelgrau
    foreground: "#1E1E1E", // Anthrazit (Card / Surface)
    icon: "#CCCCCC", // Hellgrau
    tabIconDefault: "#777777", // Gedämpftes Grau
    tabIconSelected: "#FF6B81", // Primary
    border: "#333333", // Divider
    shadow: "#333333", // Soft shadow-tone (nur Palette-Color)
  },
};
