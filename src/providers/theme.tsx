// providers/ThemeProvider.tsx
import { CategoryColors, Colors } from "@/theme/colors";
import { AppTheme, ThemeColors } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

const STORAGE_KEY = "USER_THEME_PREFERENCE";

type ThemeContextType = {
  toggleTheme: () => Promise<void>;
  overrideAccentColor: (color: string) => void;
} & AppTheme;

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = (): ThemeContextType => {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const sys = useColorScheme();
  const [override, setOverride] = useState<"light" | "dark" | null>(null);
  const [accentColor, setAccentColorState] = useState<string | undefined>(
    undefined
  );

  // Lade gespeicherte Präferenz
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((v) => {
      if (v === "light" || v === "dark") setOverride(v);
    });
  }, []);

  const toggleTheme = async () => {
    const next = current === "dark" ? "light" : "dark";
    setOverride(next);
    await AsyncStorage.setItem(STORAGE_KEY, next);
  };

  const overrideAccentColor = (color: string) => {
    setAccentColorState(color);
  };

  const current = override ?? (sys === "dark" ? "dark" : "light");
  const baseColors: ThemeColors = Colors[current];
  const colors: ThemeColors = {
    ...baseColors,
    accent: accentColor ?? baseColors.accent,
  };

  const value: ThemeContextType = {
    dark: current === "dark",
    colors,
    toggleTheme,
    overrideAccentColor,
    categoryColors: CategoryColors,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
