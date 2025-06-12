import { View, Text } from "react-native";
import React from "react";
import { FoodItem, MealSlotEntry as MealSlotEntryType, Recipe } from "@/types";
import { useTheme } from "@/providers/theme";

export function isFoodItem(entry: FoodItem | Recipe): entry is FoodItem {
  return (entry as FoodItem).calories !== undefined;
}

const FoodItemCard = ({ item }: { item: FoodItem }) => {
  const { name, calories, fat, carbohydrates, protein } = item;
  return (
    <View>
      <Text>
        {name} ({"cal " + calories})
      </Text>
      <Text style={{ fontSize: 12, color: "gray" }}>
        {fat}g Fett, {carbohydrates}g Kohlenhydrate, {protein}g Eiweiß
      </Text>
    </View>
  );
};

const RecipeCard = ({ item }: { item: Recipe }) => {
  return (
    <View>
      <Text>
        {item.name} (
        {"cal " + item.ingredients.reduce((sum, ing) => sum + ing.calories, 0)})
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
          backgroundColor: colors.background,
        },
        isLast
          ? {
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }
          : {
              borderBottomWidth: 1,
              borderBottomColor: colors.foreground,
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
