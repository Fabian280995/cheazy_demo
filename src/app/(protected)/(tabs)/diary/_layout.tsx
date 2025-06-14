import ScreenHeaderBackgroundGradient from "@/components/screens/ScreenHeaderBackgroundGradient";
import { useTheme } from "@/providers/theme";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function DiaryLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        // iOS: transparenter Header + Blur; andere: Farbe
        headerTransparent: Platform.OS === "ios",
        headerBackground: () => <ScreenHeaderBackgroundGradient />,
        /** wichtig, sonst liegt dein Screen unter dem Header */
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
