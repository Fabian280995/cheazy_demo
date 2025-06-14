import { useTheme } from "@/providers/theme"; // Adjust the import path as necessary
import React from "react";
import Card from "../shared/Card";
import CardHeader from "../shared/CardHeader";
import CardIcon from "../shared/CardIcon";

const DailyNutritionScoreCard = () => {
  const { colors } = useTheme();
  return (
    <Card>
      <CardHeader
        title="Nutrition Score"
        Icon={() => (
          <CardIcon
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
