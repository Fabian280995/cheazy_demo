// src/components/settings/SettingsLabel.tsx
import { useTheme } from "@/providers/theme";
import React from "react";
import { Text, View } from "react-native";

interface Props {
  label: string;
}

const SettingsLabel: React.FC<Props> = ({ label }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        marginHorizontal: 16,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: colors.textLight,
          textTransform: "uppercase",
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Text>
    </View>
  );
};

export default SettingsLabel;
