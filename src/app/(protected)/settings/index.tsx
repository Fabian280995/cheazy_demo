import HeaderIconButton from "@/components/screens/HeaderIconButton";
import SettingsList from "@/components/settings/SettingsList";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useTheme } from "@/providers/theme";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

const Settings = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const headerOptions = useHeaderOptions({
    title: "Einstellungen",
    largeTitle: false,
  });
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
      }}
    >
      <Stack.Screen
        options={{
          ...headerOptions,
          headerLeft: () => (
            <HeaderIconButton
              iconName="arrow-left"
              onPress={() => router.back()}
              color={colors.text}
              shadow
            />
          ),
        }}
      />
      <SettingsList />
    </ScrollView>
  );
};

export default Settings;
