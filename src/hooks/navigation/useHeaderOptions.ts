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
  largeTitle = false,
  backgroundColor,
}: Params = {}): NativeStackNavigationOptions {
  const { colors } = useTheme();

  return useMemo<NativeStackNavigationOptions>(() => {
    const bg = backgroundColor ?? undefined;

    return {
      headerTitle: title,
      headerLargeTitle: Platform.OS === "ios" && largeTitle,
      headerShadowVisible: false,

      headerStyle: { backgroundColor: bg },

      headerTitleStyle: {
        fontFamily: "Nunito",
        fontWeight: "800",
        fontSize: 18,
        color: colors.text,
      },
      headerLargeTitleStyle: {
        fontFamily: "Nunito",
        fontWeight: "900",
        color: colors.text,
      },

      headerTintColor: colors.primary,
    };
  }, [title, largeTitle, backgroundColor]);
}
