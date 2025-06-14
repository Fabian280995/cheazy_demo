import { Recipe } from "@/types";
import React from "react";
import { Text, View } from "react-native";
import CardIcon from "../shared/CardIcon";
import { useTheme } from "@/providers/theme";

export const RecipeCard = ({ item }: { item: Recipe }) => {
  const { categoryColors, colors } = useTheme();
  const ingredients = item.ingredients ?? [];
  const totalCalories = ingredients.reduce(
    (sum, ing) => sum + (ing.calories_per_100 * ing.quantity) / 100,
    0
  );
  const totalFat = ingredients.reduce(
    (sum, ing) => sum + (ing.fat_per_100 * ing.quantity) / 100,
    0
  );
  const totalCarbohydrates = ingredients.reduce(
    (sum, ing) => sum + (ing.carbohydrates_per_100 * ing.quantity) / 100,
    0
  );
  const totalProtein = ingredients.reduce(
    (sum, ing) => sum + (ing.protein_per_100 * ing.quantity) / 100,
    0
  );
  const calories = Math.round(totalCalories);
  const fat = Math.round(totalFat);
  const carbohydrates = Math.round(totalCarbohydrates);
  const protein = Math.round(totalProtein);
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <CardIcon
        name="list"
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
              fontWeight: "800",
              maxWidth: "75%",
              color: colors.text,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <Text style={{ color: colors.text, fontWeight: "800" }}>
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
