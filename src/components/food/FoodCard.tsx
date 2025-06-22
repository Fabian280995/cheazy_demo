import { useTheme } from "@/providers/theme";
import { FoodCategoryId, FoodModel } from "@/types";
import React from "react";
import { Text, View } from "react-native";
import CategoryIcon from "../shared/icons/CategoryIcon";

export const FoodCard = ({ food }: { food: FoodModel }) => {
  const { colors } = useTheme();
  const {
    name,
    carbs_g_per_100,
    fat_g_per_100,
    protein_g_per_100,
    kcal_per_100,
    category_id,
  } = food;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      <CategoryIcon id={category_id as FoodCategoryId} size={36} colorfull />
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
              maxWidth: "55%",
              color: colors.text,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {name}
          </Text>
          <Text style={{ color: colors.text, fontWeight: "700" }}>
            {kcal_per_100} kcal / 100g
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 12, color: "gray" }}>
            {fat_g_per_100}g Fett, {carbs_g_per_100}g Kohlenhydrate,{" "}
            {protein_g_per_100}g Eiweiß
          </Text>
        </View>
      </View>
    </View>
  );
};
