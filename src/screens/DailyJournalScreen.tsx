import { MEAL_SLOTS, mockEntries } from "@/constants/mealSlots";
import { FoodItem, Recipe } from "@/types";
import { groupEntriesBySlot } from "@/utils/meals";
import React from "react";
import { View, Text, FlatList } from "react-native";

export function isFoodItem(entry: FoodItem | Recipe): entry is FoodItem {
  return (entry as FoodItem).calories !== undefined;
}

const FoodItemCard = ({ item }: { item: FoodItem }) => {
  return (
    <View>
      <Text style={{ paddingVertical: 4 }}>
        {item.name} ({"cal " + item.calories})
      </Text>
    </View>
  );
};

const RecipeCard = ({ item }: { item: Recipe }) => {
  return (
    <View>
      <Text style={{ paddingVertical: 4 }}>
        {item.name} (
        {"cal " + item.ingredients.reduce((sum, ing) => sum + ing.calories, 0)})
      </Text>
      <Text style={{ fontSize: 12, color: "gray" }}>
        Zutaten: {item.ingredients.map((ing) => ing.name).join(", ")}
      </Text>
    </View>
  );
};

export default function MealPlanScreen() {
  const grouped = groupEntriesBySlot(mockEntries);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {MEAL_SLOTS.map((slot) => (
        <View key={slot.id} style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{slot.label}</Text>
          <FlatList
            data={grouped[slot.id]}
            keyExtractor={(item) => item.entry.id + "_" + item.date}
            renderItem={({ item }) => {
              if (isFoodItem(item.entry)) {
                return <FoodItemCard item={item.entry} />;
              } else {
                return <RecipeCard item={item.entry} />;
              }
            }}
            removeClippedSubviews
            initialNumToRender={10}
            maxToRenderPerBatch={5}
          />
        </View>
      ))}
    </View>
  );
}
