// themes/colors.ts
import { ThemeColors } from "@/types";

const destructiveColor = "#FF4D4F";
const successColor = "#52D689";
const warningColor = "#F6E05E";

export const Colors: Record<"light" | "dark", ThemeColors> = {
  light: {
    primary: "#7D3C98", // kräftiges, seriöses Pastell-Lila
    secondary: "#D8BFD8",
    accent: "#8351A8",
    success: successColor,
    warning: warningColor,
    destructive: destructiveColor,
    info: "#7A7A7A",
    text: "#2E2E2E",
    textForeground: "#525252",
    textLight: "#929292",
    background: "#FFFFFF",
    foreground: "#ECECEC", // leicht dunkleres Hellgrau für besseren Kontrast
    icon: "#585858",
    tabIconDefault: "#585858",
    tabIconSelected: "#7D3C98",
    shadow: "#1A1A1A",
  },
  dark: {
    primary: "#7D3C98",
    secondary: "#8351A8",
    accent: "#8351A8",
    success: successColor,
    warning: warningColor,
    destructive: destructiveColor,
    info: "#626262",
    text: "#E6E6E6",
    textForeground: "#F5F5F5",
    textLight: "#D9D9D9",
    background: "#121212",
    foreground: "#272727", // etwas helleres Dunkelgrau im Dark Mode
    icon: "#9A9A9A",
    tabIconDefault: "#9A9A9A",
    tabIconSelected: "#7D3C98",
    shadow: "#0D0D0D",
  },
};
