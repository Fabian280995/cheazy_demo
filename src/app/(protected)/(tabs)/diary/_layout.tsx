import { Platform } from "react-native";
import { Stack, useRouter } from "expo-router";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useTheme } from "@/providers/theme";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function DiaryLayout() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        // iOS: transparenter Header + Blur; andere: Farbe
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
            //from bottom to top
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
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
              style={{
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
              }}
            />
          ),
        }}
      />
    </Stack>
  );
}
