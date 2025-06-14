import { View, Text } from "react-native";
import React from "react";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useTheme } from "@/providers/theme";
import CaloryRing from "../shared/CaloryRing";

interface Props {
  value: number;
  target: number;
  ringShown?: boolean;
  size?: number;
  isCurrentDay?: boolean;
  date: number;
}

const DayNutriIndicator = ({
  size = 36,
  value,
  target,
  ringShown = false,
  isCurrentDay = false,
  date,
}: Props) => {
  const { colors } = useTheme();
  return (
    <Animated.View
      layout={LinearTransition}
      style={{
        width: size,
        height: size,
        backgroundColor: colors.background,
      }}
    >
      {ringShown && (
        <CaloryRing
          progress={value / target}
          size={size}
          stroke={4}
          trackColor={colors.foreground + "22"}
          progressColor={colors.success}
        />
      )}
      <View
        style={[
          {
            position: "absolute",
            inset: 0,
            alignItems: "center",
            justifyContent: "center",
            width: size,
            height: size,
          },
        ]}
      >
        <Text
          style={{
            fontFamily: "Nunito",
            fontSize: 16,
            fontWeight: isCurrentDay ? "900" : "700",
            color: isCurrentDay ? colors.primary : colors.textLight,
          }}
        >
          {date}
        </Text>
      </View>
    </Animated.View>
  );
};

export default DayNutriIndicator;
