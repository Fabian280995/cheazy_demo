import { Recipe } from "@/types";
import React from "react";
import { Text, View } from "react-native";
import CardIcon from "../shared/CardIcon";
import { useTheme } from "@/providers/theme";
import { getNutritionForRecipe } from "@/utils/meals";

export const RecipeCard = ({
  item,
  portions,
}: {
  item: Recipe;
  portions: number;
}) => {
  const { categoryColors, colors } = useTheme();
  const totals = getNutritionForRecipe(item, portions);
  const calories = Math.round(totals.calories);
  const fat = Math.round(totals.fat);
  const carbohydrates = Math.round(totals.carbs);
  const protein = Math.round(totals.protein);
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <CardIcon
        name="book"
        color={categoryColors.dairy.foreground}
        bgColor={categoryColors.dairy.background}
      />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "Nunito",
              fontWeight: "700",
              maxWidth: "75%",
              color: colors.text,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <Text style={{ color: colors.text, fontWeight: "700" }}>
            {calories} kcal
          </Text>
        </View>
        <Text style={{ fontSize: 12, color: colors.textLight }}>
          {fat}g Fett, {carbohydrates}g Kohlenhydrate, {protein}g Eiweiß
        </Text>
      </View>
    </View>
  );
};
