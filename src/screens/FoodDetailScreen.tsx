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
  const { colors } = useTheme();
  const datetime = new Date();
  const mealSlot = MEAL_SLOTS.find((slot) => slot.id === "Breakfast");
  const quantity = 120;
  return (
    <View style={{ flex: 1, padding: 16, gap: 16, position: "relative" }}>
      <Card
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <CategoryIcon
          id={(food.category_id as FoodCategoryId) ?? null}
          size={48}
          colorfull
        />
        <Text
          style={{ fontWeight: "bold", fontSize: 32, fontFamily: "Nunito" }}
        >
          {food.name}
        </Text>
      </Card>
      <Card style={{ marginBottom: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: 8,
          }}
        >
          <View
            style={{
              flex: 1,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
              justifyContent: "center",
              height: 64,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: "Nunito",
              }}
            >
              {datetime.toLocaleDateString("de-DE", {
                weekday: "long",
              })}
            </Text>
            <Text style={{ fontSize: 12, color: colors.textLight }}>
              {datetime.toLocaleDateString("de-DE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
              justifyContent: "center",
              height: 64,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: "Nunito",
              }}
            >
              {mealSlot ? mealSlot.label : "Frühstück"}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
              justifyContent: "center",
              height: 64,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: "Nunito",
              }}
            >
              {quantity} g
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onAddFood(food)}
          style={{
            padding: 4,
            borderRadius: 16,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-end",
            marginTop: 12,
          }}
        >
          <Feather name="plus" size={14} color={colors.primary} />
          <Text
            style={{
              fontFamily: "Nunito",
              fontSize: 12,
              color: colors.primary,
              marginLeft: 8,
            }}
          >
            {addLabel}
          </Text>
        </TouchableOpacity>
      </Card>
      <Card>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Nunito",
              fontSize: 16,
              fontWeight: "800",
            }}
          >
            Nährwerte
          </Text>
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
        </View>
        <View style={{ marginTop: 12, gap: 12 }}>
          <NutritionBar
            name="Kohlenhydrate"
            value={food.carbs_g_per_100}
            target={100}
            categoryColorProfile="carbs"
          />
          <NutritionBar
            name="Fette"
            value={food.fat_g_per_100}
            target={100}
            categoryColorProfile="fat"
          />
          <NutritionBar
            name="Proteine"
            value={food.protein_g_per_100}
            target={100}
            categoryColorProfile="protein"
          />
        </View>
      </Card>
    </View>
  );
};

export default FoodDetailScreen;
