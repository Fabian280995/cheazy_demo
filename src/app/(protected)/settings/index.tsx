import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useSignOut } from "@/hooks/auth/useSignOut";
import { useTheme } from "@/providers/theme";

const Settings = () => {
  const { colors } = useTheme();
  const { mutate: logout } = useSignOut();
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
      }}
    >
      <TouchableOpacity
        onPress={() => logout()}
        style={{
          padding: 16,
          backgroundColor: colors.destructive,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.textForeground }}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Settings;
