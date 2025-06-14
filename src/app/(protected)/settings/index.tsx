import HeaderIconButton from "@/components/screens/HeaderIconButton";
import SettingsList from "@/components/settings/SettingsList";
import { useSignOut } from "@/hooks/auth/useSignOut";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useTheme } from "@/providers/theme";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

const Settings = () => {
  const { colors } = useTheme();
  const { mutate: logout } = useSignOut();
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
