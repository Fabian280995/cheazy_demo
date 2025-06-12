import { Platform } from "react-native";
import { Stack, useRouter } from "expo-router";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useTheme } from "@/providers/theme";
import React from "react";

export default function DiaryLayout() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        // iOS: transparenter Header + Blur; andere: Farbe
        headerTransparent: Platform.OS === "ios",
        headerStyle: {
          backgroundColor: colors.background,
        },
        /** wichtig, sonst liegt dein Screen unter dem Header */
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Tagebuch",
          headerLargeTitle: true, // großer Titel
          animation: "none",
          headerShadowVisible: false,
          headerRight: () => (
            <HeaderIconButton
              iconName="settings"
              onPress={() => router.push("/settings")}
              color={colors.text}
            />
          ),
        }}
      />
    </Stack>
  );
}
