import { FoodItem } from "@/types";
import React from "react";
import { Text, View } from "react-native";

export const FoodItemCard = ({ item }: { item: FoodItem }) => {
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
