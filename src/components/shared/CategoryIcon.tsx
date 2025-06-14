import { View, Text } from "react-native";
import React, { ComponentProps } from "react";
import { Octicons } from "@expo/vector-icons";
import { useTheme } from "@/providers/theme";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  name: ComponentProps<typeof Octicons>["name"];
  size?: number;
  color: string;
  bgColor?: string;
  gradient?: boolean;
}

const CategoryIcon = ({ name, size = 36, color, bgColor, gradient }: Props) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 16,
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {gradient && (
        <LinearGradient
          colors={[bgColor || colors.accent, color]}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: 16,
          }}
        />
      )}
      <Octicons
        name={name}
        size={size * 0.5}
        color={gradient ? colors.textForeground : color}
      />
    </View>
  );
};

export default CategoryIcon;
