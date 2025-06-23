import { useTheme } from "@/providers/theme"; // Adjust the import path as necessary
import { Macros } from "@/types/nutrition";
import React from "react";
import { View } from "react-native";
import NutritionBar from "../nutrition/NutritionBar";
import Card from "../shared/Card";
import CardHeader from "../shared/CardHeader";
import CardIcon from "../shared/CardIcon";

const DailyNutritionScoreCard = ({
  consumedMacros,
  targetMacros = { fat: 80, carbs: 300, protein: 180 },
}: {
  consumedMacros: Macros;
  targetMacros?: Macros;
}) => {
  const { colors, categoryColors } = useTheme();
  return (
    <Card>
      <CardHeader
        title="Nutrition Score"
        Icon={() => (
          <CardIcon
            name="beaker"
            color={colors.protein}
            bgColor={categoryColors.fastfood.background}
            gradient
          />
        )}
      />
      <View style={{ marginTop: 12, gap: 12 }}>
        <NutritionBar
          name="Carbohydrates"
          value={consumedMacros.carbs}
          target={targetMacros.carbs}
          categoryColorProfile="carbs"
        />
        <NutritionBar
          name="Fats"
          value={consumedMacros.fat}
          target={targetMacros.fat}
          categoryColorProfile="fat"
        />
        <NutritionBar
          name="Protein"
          value={consumedMacros.protein}
          target={targetMacros.protein}
          categoryColorProfile="protein"
        />
      </View>
    </Card>
  );
};

export default DailyNutritionScoreCard;
