import { useTheme } from "@/providers/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

const ScreenHeaderBackgroundGradient = () => {
  const { colors } = useTheme();
  return (
    <LinearGradient
      colors={[
        `${colors.background}FF`,
        `${colors.background}FF`,
        `${colors.foreground}00`,
      ]}
      style={{
        position: "absolute",
        inset: 0,
      }}
      //from bottom to top
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    />
  );
};

export default ScreenHeaderBackgroundGradient;
