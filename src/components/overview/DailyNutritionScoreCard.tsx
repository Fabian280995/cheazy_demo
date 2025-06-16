import { useTheme } from "@/providers/theme"; // Adjust the import path as necessary
import React from "react";
import { View } from "react-native";
import Card from "../shared/Card";
import CardHeader from "../shared/CardHeader";
import CardIcon from "../shared/CardIcon";
import NutritionBar from "../nutrition/NutritionBar";

const DailyNutritionScoreCard = () => {
  const { colors, categoryColors } = useTheme();
  return (
    <Card>
      <CardHeader
        title="Nutrition Score"
        Icon={() => (
          <CardIcon
            name="pie-chart"
            color={colors.protein}
            bgColor={categoryColors.fastfood.background}
            gradient
          />
        )}
      />
      <View style={{ marginTop: 12, gap: 12 }}>
        <NutritionBar
          name="Carbohydrates"
          value={320}
          target={300}
          categoryColorProfile="carbs"
        />
        <NutritionBar
          name="Fats"
          value={70}
          target={80}
          categoryColorProfile="fat"
        />
        <NutritionBar
          name="Protein"
          value={75}
          target={180}
          categoryColorProfile="protein"
        />
      </View>
    </Card>
  );
};

export default DailyNutritionScoreCard;
