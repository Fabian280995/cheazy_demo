// src/navigation/useHeaderOptions.ts
import { useTheme } from "@/providers/theme";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { Platform } from "react-native";

type Params = {
  title?: string;
  largeTitle?: boolean;
  backgroundColor?: string;
};

export function useHeaderOptions({
  title,
  largeTitle = true,
  backgroundColor,
}: Params = {}): NativeStackNavigationOptions {
  const { colors, dark } = useTheme();

  return useMemo<NativeStackNavigationOptions>(() => {
    const bg = backgroundColor ?? "transparent";

    return {
      headerTitle: title,
      headerLargeTitle: Platform.OS === "ios" && largeTitle,
      headerShadowVisible: false,

      headerStyle: { backgroundColor: bg },

      /* Nunito – Überschriften */
      headerTitleStyle: {
        fontFamily: "Nunito_700Bold",
        fontSize: 18,
        color: colors.text,
      },
      headerLargeTitleStyle: {
        fontFamily: "Nunito_900Black",
        color: colors.text,
      },

      headerTintColor: colors.primary,
      headerBackTitleStyle: { fontFamily: "Inter_400Regular" },

      headerBlurEffect: dark
        ? "systemUltraThinMaterialDark"
        : "systemUltraThinMaterialLight",
    };
  }, [title, largeTitle, backgroundColor]);
}
