import { View, Text, Pressable } from "react-native";
import React from "react";
import { FoodItem, MealSlotEntry as MealSlotEntryType, Recipe } from "@/types";
import { useTheme } from "@/providers/theme";
import { Feather } from "@expo/vector-icons";

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
        Zutaten: {ingredients.map((ing) => ing.name).join(", ")}
      </Text>
    </View>
  );
};

interface Props {
  entry: MealSlotEntryType;
  isLast?: boolean;
  isFirst?: boolean;
  isSelected?: boolean;
  showSelectedState?: boolean;
  onPress?: (entry: MealSlotEntryType) => void;
}

const MealSlotEntry = ({
  entry,
  isLast = false,
  isFirst = false,
  isSelected,
  showSelectedState = false,
  onPress,
}: Props) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={() => onPress?.(entry)}
      disabled={!onPress}
      style={[
        {
          paddingVertical: 12,
          paddingHorizontal: 12,
          backgroundColor: colors.foreground,
          flexDirection: "row",
          alignItems: "center",
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
      {showSelectedState && (
        <View>
          <Feather
            name={isSelected ? "check-circle" : "circle"}
            size={24}
            color={isSelected ? colors.success : colors.textLight}
            style={{ marginRight: 8 }}
          />
        </View>
      )}
      <View style={{ flex: 1 }}>
        {isFoodItem(entry.entry) ? (
          <FoodItemCard item={entry.entry} />
        ) : (
          <RecipeCard item={entry.entry} />
        )}
      </View>
    </Pressable>
  );
};

export default MealSlotEntry;
