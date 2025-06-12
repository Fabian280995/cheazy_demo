import { View, Text } from "react-native";
import React from "react";
import { FoodItem, MealSlotEntry as MealSlotEntryType, Recipe } from "@/types";
import { useTheme } from "@/providers/theme";

export function isFoodItem(entry: FoodItem | Recipe): entry is FoodItem {
  return (entry as FoodItem).calories_per_100 !== undefined;
}

const FoodItemCard = ({ item }: { item: FoodItem }) => {
  const {
    name,
    calories_per_100,
    fat_per_100,
    carbohydrates_per_100,
    protein_per_100,
    quantity,
  } = item;
  const calories = Math.round((calories_per_100 * quantity) / 100);

  const fat = Math.round((fat_per_100 * quantity) / 100);
  const carbohydrates = Math.round((carbohydrates_per_100 * quantity) / 100);
  const protein = Math.round((protein_per_100 * quantity) / 100);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{name}</Text>
        <Text style={{ color: "gray" }}>{calories} kcal</Text>
      </View>
      <Text style={{ fontSize: 12, color: "gray" }}>
        {fat}g Fett, {carbohydrates}g Kohlenhydrate, {protein}g Eiweiß
      </Text>
      <Text style={{ fontSize: 12, color: "gray" }}>Menge: {quantity}g</Text>
    </View>
  );
};

const RecipeCard = ({ item }: { item: Recipe }) => {
  const totalCalories = item.ingredients.reduce(
    (sum, ing) => sum + (ing.calories_per_100 * ing.quantity) / 100,
    0
  );
  const totalFat = item.ingredients.reduce(
    (sum, ing) => sum + (ing.fat_per_100 * ing.quantity) / 100,
    0
  );
  const totalCarbohydrates = item.ingredients.reduce(
    (sum, ing) => sum + (ing.carbohydrates_per_100 * ing.quantity) / 100,
    0
  );
  const totalProtein = item.ingredients.reduce(
    (sum, ing) => sum + (ing.protein_per_100 * ing.quantity) / 100,
    0
  );
  const calories = Math.round(totalCalories);
  const fat = Math.round(totalFat);
  const carbohydrates = Math.round(totalCarbohydrates);
  const protein = Math.round(totalProtein);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <Text
          style={{ fontWeight: "bold", maxWidth: "75%" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
        <Text style={{ color: "gray" }}>{calories} kcal</Text>
      </View>
      <Text style={{ fontSize: 12, color: "gray" }}>
        {fat}g Fett, {carbohydrates}g Kohlenhydrate, {protein}g Eiweiß
      </Text>
      <Text style={{ fontSize: 12, color: "gray" }}>
        Zutaten: {item.ingredients.map((ing) => ing.name).join(", ")}
      </Text>
    </View>
  );
};

interface Props {
  entry: MealSlotEntryType;
  isLast?: boolean;
  isFirst?: boolean;
}

const MealSlotEntry = ({ entry, isLast = false, isFirst = false }: Props) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        {
          paddingVertical: 12,
          paddingHorizontal: 12,
          backgroundColor: colors.foreground,
        },
        isLast
          ? {
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }
          : {
              borderBottomWidth: 1,
              borderBottomColor: colors.background,
            },
        isFirst && {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },
      ]}
    >
      {isFoodItem(entry.entry) ? (
        <FoodItemCard item={entry.entry} />
      ) : (
        <RecipeCard item={entry.entry} />
      )}
    </View>
  );
};

export default MealSlotEntry;
