import { useTheme } from "@/providers/theme"; // Adjust the import path as necessary
import React from "react";
import Card from "../shared/Card";
import CardHeader from "../shared/CardHeader";
import CardIcon from "../shared/CardIcon";
import CategoryIcon from "../shared/icons/CategoryIcon";
import { View } from "react-native";
import { foodCategories } from "@/constants/foodCategories";

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
      <View
        style={{
          marginTop: 12,
          gap: 16,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {foodCategories.map(({ id }) => (
          <CategoryIcon key={id} id={id} />
        ))}
      </View>
    </Card>
  );
};

export default DailyNutritionScoreCard;
