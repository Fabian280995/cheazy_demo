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
    </View>
  );
};

const RecipeCard = ({ item }: { item: Recipe }) => {
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
          style={{ fontWeight: "bold" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
        <Text style={{ color: "gray" }}>
          {item.ingredients.reduce((sum, ing) => sum + ing.calories, 0)} kcal
        </Text>
      </View>
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
