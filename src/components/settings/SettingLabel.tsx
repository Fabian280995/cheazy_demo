import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@/providers/theme";

const SettingLabel = ({ label }: { label: string }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        marginLeft: 8,
      }}
    >
      <Text
        style={{
          fontFamily: "Nunito",
          fontWeight: "800",
          fontSize: 16,
          color: colors.text,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default SettingLabel;
