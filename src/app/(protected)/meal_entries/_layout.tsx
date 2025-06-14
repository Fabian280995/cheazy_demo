import ScreenHeaderBackgroundGradient from "@/components/screens/ScreenHeaderBackgroundGradient";
import { Stack } from "expo-router";
import React from "react";

function MealsLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerBackground: () => <ScreenHeaderBackgroundGradient />,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="new" />
    </Stack>
  );
}

export default MealsLayout;
