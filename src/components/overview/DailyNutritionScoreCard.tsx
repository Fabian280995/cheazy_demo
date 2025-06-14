import { View, Text } from "react-native";
import React from "react";
import Card from "../shared/Card";
import CardHeader from "../shared/CardHeader";
import CategoryIcon from "../shared/CategoryIcon";
import { useTheme } from "@/providers/theme";

const DailyNutritionScoreCard = () => {
  const { colors } = useTheme();
  return (
    <Card>
      <CardHeader
        title="Nutrition Score"
        Icon={() => (
          <CategoryIcon
            name="tag"
            color={colors.success}
            bgColor={colors.success}
            gradient
          />
        )}
      />
    </Card>
  );
};

export default DailyNutritionScoreCard;
