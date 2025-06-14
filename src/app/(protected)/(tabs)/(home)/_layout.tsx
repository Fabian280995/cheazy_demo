import ScreenHeaderBackgroundGradient from "@/components/screens/ScreenHeaderBackgroundGradient";
import { useTheme } from "@/providers/theme";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

function HomeLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerTransparent: Platform.OS === "ios",
        headerBackground: () => <ScreenHeaderBackgroundGradient />,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default HomeLayout;
