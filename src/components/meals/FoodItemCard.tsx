import { FoodItem } from "@/types";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CategoryIcon from "../shared/icons/CategoryIcon";
import { useTheme } from "@/providers/theme";
import { useRouter } from "expo-router";

export const FoodItemCard = ({ item }: { item: FoodItem }) => {
  const { colors } = useTheme();
  const router = useRouter();
  const {
    name,
    calories_per_100,
    fat_per_100,
    carbohydrates_per_100,
    protein_per_100,
    quantity,
    category,
  } = item;
  const calories = Math.round((calories_per_100 * quantity) / 100);

  const fat = Math.round((fat_per_100 * quantity) / 100);
  const carbohydrates = Math.round((carbohydrates_per_100 * quantity) / 100);
  const protein = Math.round((protein_per_100 * quantity) / 100);

  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
      onPress={() => router.push(`/(protected)/meal_entries/${item.id}`)}
    >
      <CategoryIcon id={category} size={36} colorfull />
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
            {name}{" "}
            <Text style={{ color: colors.textLight, fontWeight: "700" }}>
              {quantity}g
            </Text>
          </Text>
          <Text style={{ color: colors.text, fontWeight: "700" }}>
            {calories} kcal
          </Text>
        </View>
        <Text style={{ fontSize: 12, color: "gray" }}>
          {fat}g Fett, {carbohydrates}g Kohlenhydrate, {protein}g Eiweiß
        </Text>
      </View>
    </TouchableOpacity>
  );
};
