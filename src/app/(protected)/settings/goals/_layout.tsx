import ScreenHeaderBackgroundGradient from "@/components/screens/ScreenHeaderBackgroundGradient";
import { Stack } from "expo-router";
import React from "react";

function GoalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerBackground: () => <ScreenHeaderBackgroundGradient />,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="nutrition" />
    </Stack>
  );
}

export default GoalsLayout;
