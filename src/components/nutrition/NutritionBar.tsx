import { useTheme } from "@/providers/theme";
import { NutritionTotals } from "@/types";
import React from "react";
import { Text, View } from "react-native";

const NutritionBar = ({
  nutrients,
  opacity = 1,
}: {
  nutrients: NutritionTotals;
  opacity?: number;
}) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        height: 18,
        backgroundColor: colors.background,
        borderRadius: 8,
        overflow: "hidden",
        opacity,
      }}
    >
      <NutrientBar
        value={nutrients.carbs}
        total={nutrients.calories}
        color={colors.carbs}
      />
      <NutrientBar
        value={nutrients.fat}
        total={nutrients.calories}
        color={colors.fat}
        fat
      />
      <NutrientBar
        value={nutrients.protein}
        total={nutrients.calories}
        color={colors.protein}
      />
    </View>
  );
};

const NutrientBar = ({
  value,
  total,
  color,
  fat = false,
}: {
  name?: string;
  value: number;
  total: number;
  color: string;
  fat?: boolean;
}) => {
  const { colors } = useTheme();
  const multiplier = fat ? 9 : 4;
  const percentage = ((value * multiplier) / total) * 100;
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
        width: `${percentage}%`,
      }}
    >
      {percentage > 5 && (
        <>
          <Text
            style={{
              color: colors.textForeground,
              fontSize: 10,
              fontWeight: "700",
            }}
          >
            {value.toFixed(0)}g
          </Text>
        </>
      )}
    </View>
  );
};

export default NutritionBar;
