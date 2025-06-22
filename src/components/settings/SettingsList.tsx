import SettingsBlock from "@/components/settings/SettingsBlock";
import { useSignOut } from "@/hooks/auth/useSignOut";
import { ButtonSetting } from "@/lib/settings/ButtonSetting";
import { ToggleSetting } from "@/lib/settings/ToggleSetting";
import { useTheme } from "@/providers/theme";
import { useRouter } from "expo-router";
import React from "react";

const SettingsList = () => {
  const router = useRouter();
  const { colors, dark, toggleTheme } = useTheme();
  const { mutateAsync: signOut } = useSignOut();

  const goalSettings = [
    new ButtonSetting(
      "nutrition",
      "Nährstoffe",
      "pie-chart",
      () => {
        router.push("/settings/goals/nutrition");
      },
      colors,
      true
    ),
  ];

  const appSettings = [
    new ToggleSetting(
      "darkMode",
      "Dark Mode",
      "moon",
      dark,
      toggleTheme,
      colors
    ),
    new ToggleSetting(
      "notifications",
      "Notifications",
      "bell",
      true,
      () => {},
      colors
    ),
  ];

  const authSettings = [
    new ButtonSetting(
      "logout",
      "Abmelden",
      "log-out",
      () => {
        signOut();
      },
      colors
    ),
  ];

  return (
    <>
      <SettingsBlock
        settings={goalSettings}
        label="Goals"
        description="Manage your goals"
      />
      <SettingsBlock
        settings={appSettings}
        label="App"
        description="Customize your app experience"
      />
      <SettingsBlock label="Account" settings={authSettings} />
    </>
  );
};

export default SettingsList;
