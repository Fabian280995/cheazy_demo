import HeaderIconButton from "@/components/screens/HeaderIconButton";
import ScreenWrapper from "@/components/screens/ScreenWrapper";
import { useTheme } from "@/providers/theme";
import { Stack, useRouter } from "expo-router";
import React from "react";

function SettingsLayout() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <ScreenWrapper>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Einstellungen",
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerShadowVisible: false,
            headerLargeTitle: true,
            headerLeft: () => (
              <HeaderIconButton
                iconName="arrow-left"
                onPress={() => router.back()}
                color={colors.text}
              />
            ),
          }}
        />
      </Stack>
    </ScreenWrapper>
  );
}

export default SettingsLayout;
