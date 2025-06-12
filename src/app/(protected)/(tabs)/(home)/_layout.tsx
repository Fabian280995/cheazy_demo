import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useTheme } from "@/providers/theme";
import { Stack, useRouter } from "expo-router";
import React from "react";

function HomeLayout() {
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
          headerTitle: "",
          headerStyle: {
            backgroundColor: "transparent",
          },
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

export default HomeLayout;
