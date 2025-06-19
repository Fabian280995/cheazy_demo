import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useTheme } from "@/providers/theme";
import Animated, { BounceIn, FadeOut } from "react-native-reanimated";

interface Props {
  size?: "small" | "large";
  color?: string;
}

const LoadingIndicator = ({ size = "large", color }: Props) => {
  const { colors } = useTheme();
  return (
    <Animated.View
      entering={BounceIn}
      exiting={FadeOut.duration(100)}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size={size} color={color ?? colors.secondary} />
    </Animated.View>
  );
};

export default LoadingIndicator;
