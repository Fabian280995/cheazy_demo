import { useTheme } from "@/providers/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

function HomeLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerTransparent: Platform.OS === "ios",
        headerBackground: () => (
          <LinearGradient
            colors={[
              `${colors.background}FF`,
              `${colors.background}FF`,
              `${colors.foreground}00`,
            ]}
            style={{
              position: "absolute",
              inset: 0,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default HomeLayout;
