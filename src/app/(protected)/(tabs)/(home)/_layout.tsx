import { useTheme } from "@/providers/theme";
import { Stack } from "expo-router";
import React from "react";

function HomeLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default HomeLayout;
