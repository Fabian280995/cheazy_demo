import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { FoodCategoryId, FoodModel } from "@/types";
import CategoryIcon from "@/components/shared/icons/CategoryIcon";
import { useTheme } from "@/providers/theme";
import { Feather } from "@expo/vector-icons";
import Card from "@/components/shared/Card";
import NutritionBar from "@/components/nutrition/NutritionBar";
import { MEAL_SLOTS } from "@/constants/mealSlots";
import { foodCategories } from "@/constants/foodCategories";
import CardHeader from "@/components/shared/CardHeader";
import CardIcon from "@/components/shared/CardIcon";
import AddFoodCard from "../components/food/AddFoodCard";

interface Props {
  food: FoodModel;
  onAddFood: (food: FoodModel) => void;
  addLabel?: string;
}

const FoodDetailScreen = ({
  food,
  onAddFood,
  addLabel = "Hinzufügen",
}: Props) => {
  const { colors, categoryColors } = useTheme();
  const datetime = new Date();
  const mealSlot = MEAL_SLOTS.find((slot) => slot.id === "Breakfast");
  const quantity = 120;
  return (
    <View style={{ flex: 1, padding: 16, gap: 16, position: "relative" }}>
      <Card>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <CategoryIcon
            id={(food.category_id as FoodCategoryId) ?? null}
            size={48}
            colorfull
          />
          <Text
            style={{
              fontWeight: "700",
              fontSize: 32,
              fontFamily: "Nunito",
              maxWidth: "80%",
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
            adjustsFontSizeToFit
          >
            {food.name}
          </Text>
        </View>
        <View style={{ marginTop: 12, gap: 4 }}>
          <Text
            style={{
              fontFamily: "Inter",
              fontSize: 16,
              color: colors.textLight,
            }}
          >
            {food.description || "Keine Beschreibung verfügbar."}
          </Text>
        </View>
      </Card>
      <AddFoodCard
        food={food}
        name="Nahrungsmittel hinzufügen"
        onAddFood={onAddFood}
      />
      <Card>
        <CardHeader
          title="Nährwerte pro 100g"
          Icon={() => (
            <CardIcon
              name="pie-chart"
              color={colors.protein}
              bgColor={categoryColors.fastfood.background}
              gradient
            />
          )}
        >
          <Text
            style={{
              fontFamily: "Inter",
              fontSize: 16,
              fontWeight: "700",
              color: colors.secondary,
              marginLeft: 8,
            }}
          >
            {food.kcal_per_100} kcal
          </Text>
        </CardHeader>
        <View style={{ marginTop: 12, gap: 12 }}>
          <NutritionBar
            name="Kohlenhydrate"
            value={food.carbs_g_per_100}
            target={100}
            categoryColorProfile="carbs"
            hideTarget
          />
          <NutritionBar
            name="Fette"
            value={food.fat_g_per_100}
            target={100}
            categoryColorProfile="fat"
            hideTarget
          />
          <NutritionBar
            name="Proteine"
            value={food.protein_g_per_100}
            target={100}
            categoryColorProfile="protein"
            hideTarget
          />
        </View>
      </Card>
    </View>
  );
};

export default FoodDetailScreen;
