import NutritionBar from "@/components/nutrition/NutritionBar";
import Card from "@/components/shared/Card";
import CardHeader from "@/components/shared/CardHeader";
import CardIcon from "@/components/shared/CardIcon";
import CategoryIcon from "@/components/shared/icons/CategoryIcon";
import { MEAL_SLOTS } from "@/constants/mealSlots";
import { useTheme } from "@/providers/theme";
import { FoodCategoryId, FoodModel } from "@/types";
import React, { useCallback, useRef } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { padding } from "aes-js";
import { foodCategories } from "@/constants/foodCategories";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FoodDetailHeader from "@/components/food/FoodDetailHeader";
import { Feather } from "@expo/vector-icons";

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
  const inputRef = useRef<TextInput>(null);
  const { colors, categoryColors } = useTheme();
  const insets = useSafeAreaInsets();
  const datetime = new Date();
  const mealSlot = MEAL_SLOTS.find((slot) => slot.id === "Breakfast");
  const [quantity, setQuantity] = React.useState(100);
  const height = useWindowDimensions().height;

  const category = foodCategories.find((cat) => cat.id === food.category_id);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: "relative",
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: category
            ? category.backgroundColor
            : colors.background,
        }}
      >
        {category && (
          <View
            style={{
              width: "100%",
              height: height / 3 + 32,
              backgroundColor: category.backgroundColor,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CategoryIcon
              id={food.category_id as FoodCategoryId}
              size={120}
              colorfull
            />
          </View>
        )}
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.foreground,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: insets.bottom + 16,
          height: (height / 3) * 2,
        }}
      >
        <ScrollView
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            paddingTop: 20,
            paddingHorizontal: 24,
            gap: 32,
          }}
        >
          <FoodDetailHeader food={food} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
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
            <Pressable
              style={{
                flex: 1,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: "center",
                justifyContent: "center",
                height: 64,
              }}
              onPress={() => {
                inputRef.current?.focus();
              }}
            >
              <TextInput
                ref={inputRef}
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "Nunito",
                }}
                keyboardType="numeric"
                value={quantity.toString()}
                onChangeText={(text) => {
                  const num = parseInt(text);
                  if (!isNaN(num) && num > 0) {
                    setQuantity(num);
                  } else {
                    setQuantity(0);
                  }
                }}
                placeholder="100"
                placeholderTextColor={colors.textLight}
                maxLength={5}
              />
            </Pressable>
          </View>

          <View style={{ gap: 12 }}>
            <Text
              style={{
                fontFamily: "Nunito",
                color: colors.text,
                fontSize: 24,
                fontWeight: "900",
              }}
            >
              {(food.kcal_per_100 * quantity) / 100} kcal
            </Text>
            <NutritionBar
              name="Kohlenhydrate"
              value={food.carbs_g_per_100 * (quantity / 100)}
              target={quantity}
              categoryColorProfile="carbs"
              hideTarget
            />
            <NutritionBar
              name="Fette"
              value={food.fat_g_per_100 * (quantity / 100)}
              target={quantity}
              categoryColorProfile="fat"
              hideTarget
            />
            <NutritionBar
              name="Proteine"
              value={food.protein_g_per_100 * (quantity / 100)}
              target={quantity}
              categoryColorProfile="protein"
              hideTarget
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => onAddFood(food)}
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            alignItems: "center",
            position: "absolute",
            bottom: insets.bottom + 16,
            left: 24,
            right: 24,
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Feather name="plus" size={24} color={colors.textForeground} />
          <Text
            style={{
              fontFamily: "Inter",
              fontSize: 16,
              fontWeight: "700",
              color: colors.textForeground,
            }}
          >
            {addLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FoodDetailScreen;
