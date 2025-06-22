import ScreenHeaderBackgroundGradient from "@/components/screens/ScreenHeaderBackgroundGradient";
import ScreenWrapper from "@/components/screens/ScreenWrapper";
import { Stack } from "expo-router";
import React from "react";

function SettingsLayout() {
  return (
    <ScreenWrapper>
      <Stack
        screenOptions={{
          headerTransparent: true,
          headerBackground: () => <ScreenHeaderBackgroundGradient />,
          contentStyle: { backgroundColor: "transparent" },
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </ScreenWrapper>
  );
}

export default SettingsLayout;
