import { useTheme } from "@/providers/theme"; // Adjust the import path as necessary
import React from "react";
import { Text, View } from "react-native";
import ProgressBar from "../shared/ProgressBar";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const NutritionBar = ({
  name,
  value,
  target,
  deviation = 0,
  categoryColorProfile,
  showTargetLabel = true,
  showTargetRange = true,
}: {
  name: string;
  value: number;
  target: number;
  deviation?: number;
  categoryColorProfile: "protein" | "fat" | "carbs";
  showTargetLabel?: boolean;
  showTargetRange?: boolean;
}) => {
  const { colors } = useTheme();

  // Calculate the target range based on deviation
  const targetMin = target * (1 - deviation);
  const targetMax = target * (1 + deviation);
  const highestValue = Math.max(value, targetMax);
  const step =
    highestValue >= 5000
      ? 1000
      : highestValue >= 1000
      ? 500
      : highestValue >= 500
      ? 100
      : highestValue >= 200
      ? 50
      : highestValue >= 100
      ? 20
      : highestValue >= 50
      ? 10
      : highestValue >= 20
      ? 5
      : highestValue >= 10
      ? 2
      : highestValue >= 5
      ? 1
      : 0.5;
  const progressBarRight = Math.ceil(Math.max(value, targetMax) / step) * step;
  const pct = Math.round((value / target) * 100);
  const pctText = isNaN(pct) ? "0" : pct.toString();

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter",
            color: colors.textLight,
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontFamily: "Nunito",
            color: colors.text,
            fontSize: 14,
            fontWeight: "700",
          }}
        >
          {value.toFixed(0)} {showTargetLabel && "/ " + target.toFixed(0)} g
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Nunito",
            color: value > targetMax ? colors.success : colors.text,
            fontSize: 16,
            fontWeight: "800",
            marginRight: 8,
            width: "14%",
          }}
        >
          {pctText}%
        </Text>
        <ProgressBar
          height={10}
          current={value}
          min={0}
          max={progressBarRight}
          targetMin={targetMin}
          targetMax={targetMax}
          colors={{
            barBackground: colors.background,
            targetRange: colors.textLight,
            inRange: colors[categoryColorProfile],
            normal: colors[categoryColorProfile],
            over: colors[categoryColorProfile],
          }}
          overlayOpacity={0.8}
          showTargetRange={showTargetRange}
        />
      </View>
    </View>
  );
};

export default NutritionBar;
