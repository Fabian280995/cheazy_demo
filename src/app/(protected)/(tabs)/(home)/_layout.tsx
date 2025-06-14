import ScreenHeaderBackgroundGradient from "@/components/screens/ScreenHeaderBackgroundGradient";
import { Stack } from "expo-router";
import React from "react";

function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerBackground: () => <ScreenHeaderBackgroundGradient />,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default HomeLayout;
