import { useTheme } from "@/providers/theme";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { ComponentProps } from "react";
import { View } from "react-native";

interface Props {
  name: ComponentProps<typeof Octicons>["name"];
  size?: number;
  color: string;
  bgColor?: string;
  gradient?: boolean;
  invert?: boolean;
}

const CardIcon = ({
  name,
  size = 36,
  color,
  bgColor,
  gradient,
  invert,
}: Props) => {
  const { colors } = useTheme();
  const bgDefault = bgColor || colors.accent;
  const fg = !invert ? color : bgDefault;
  const bg = !invert ? bgDefault : color;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 16,
        backgroundColor: bg,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {gradient && (
        <LinearGradient
          colors={[bg || colors.accent, fg]}
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
        size={(size / 5) * 3}
        color={gradient ? colors.textForeground : fg}
      />
    </View>
  );
};

export default CardIcon;
