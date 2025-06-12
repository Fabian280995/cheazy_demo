import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useTheme } from "@/providers/theme";
import { Stack, useRouter } from "expo-router";
import React from "react";

function DiaryLayout() {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Tagebuch",
          headerStyle: {
            backgroundColor: "transparent",
          },
          animation: "none",
          headerShadowVisible: false,
          headerLargeTitle: true,
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

export default DiaryLayout;
