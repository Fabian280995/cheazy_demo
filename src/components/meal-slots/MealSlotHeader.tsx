import { useTheme } from "@/providers/theme";
import { NutritionTotals } from "@/types";
import React from "react";
import { Text, View } from "react-native";
import { ListItem } from "../shared/list/ListItem";

interface Props {
  title: string;
  totals: NutritionTotals;
}

const MealSlotHeader = ({ title, totals }: Props) => {
  const { colors } = useTheme();
  const totalCalories = totals.calories.toFixed(0);

  return (
    <ListItem isFirst>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Nunito",
            color: colors.text,
            fontWeight: "900",
            fontSize: 16,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: "Inter",
            color: colors.primary,
            fontWeight: "700",
            fontSize: 16,
          }}
        >
          {totalCalories} kcal
        </Text>
      </View>
      <Text
        style={{ fontSize: 12, color: "gray", textAlign: "right" }}
        ellipsizeMode="tail"
      >
        {totals.fat.toFixed(0)}g Fett, {totals.carbs.toFixed(0)}g Kohlenhydrate,{" "}
        {totals.protein.toFixed(0)}g Eiweiß
      </Text>
    </ListItem>
  );
};

export default MealSlotHeader;
