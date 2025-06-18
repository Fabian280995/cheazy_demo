import ScreenHeaderBackgroundGradient from "@/components/screens/ScreenHeaderBackgroundGradient";
import ScreenWrapper from "@/components/screens/ScreenWrapper";
import { Stack } from "expo-router";
import React from "react";

function MealEntriesLayout() {
  return (
    <ScreenWrapper>
      <Stack
        screenOptions={{
          headerTransparent: true,
          headerBackground: () => <ScreenHeaderBackgroundGradient />,
          contentStyle: { backgroundColor: "transparent" },
          headerShown: false,
        }}
      />
    </ScreenWrapper>
  );
}

export default MealEntriesLayout;
