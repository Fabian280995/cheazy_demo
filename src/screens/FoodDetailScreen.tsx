import FoodDetailHeader from "@/components/food/FoodDetailHeader";
import { DateSelect } from "@/components/meal-slots/DateSelect";
import MealSlotSelect from "@/components/meal-slots/MealSlotSelect";
import { QuantitySelect } from "@/components/meal-slots/QuantitySelect";
import NutritionBar from "@/components/nutrition/NutritionBar";
import CardHeader from "@/components/shared/CardHeader";
import CategoryIcon from "@/components/shared/icons/CategoryIcon";
import { foodCategories } from "@/constants/foodCategories";
import { MEAL_SLOTS } from "@/constants/mealSlots";
import { useTheme } from "@/providers/theme";
import { FoodCategoryId, FoodModel, MealSlot } from "@/types";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface initialEntryData {
  id?: string;
  datetime: Date;
  mealSlot: MealSlot;
  quantity?: number;
}

interface Props {
  food: FoodModel;
  onAddFood: (food: FoodModel) => void;
  addLabel?: string;
  initialEntryData?: initialEntryData | undefined;
}

const FoodDetailScreen = ({
  food,
  onAddFood,
  addLabel = "Hinzufügen",
  initialEntryData = {
    id: undefined,
    datetime: new Date(),
    mealSlot: MEAL_SLOTS[0],
    quantity: 100,
  },
}: Props) => {
  const { colors } = useTheme();
  const height = useWindowDimensions().height;
  const insets = useSafeAreaInsets();

  const inputRef = useRef<TextInput>(null);

  const [datetime, setDatetime] = useState(initialEntryData.datetime);
  const [mealSlot, setMealSlot] = useState(initialEntryData.mealSlot);
  const [quantity, setQuantity] = React.useState<number>(
    initialEntryData.quantity || 100
  );

  const category = foodCategories.find((cat) => cat.id === food.category_id);
  const totalCalories = (food.kcal_per_100 * quantity) / 100;
  const totalCarbs = food.carbs_g_per_100 * (quantity / 100);
  const totalFat = food.fat_g_per_100 * (quantity / 100);
  const totalProtein = food.protein_g_per_100 * (quantity / 100);

  useEffect(() => {
    if (initialEntryData) {
      setDatetime(initialEntryData.datetime);
      setMealSlot(initialEntryData.mealSlot);
      setQuantity(initialEntryData.quantity || 100);
    }
  }, [initialEntryData]);

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
      <Animated.View
        entering={SlideInDown.duration(700)}
        exiting={SlideOutDown.duration(500)}
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
            gap: 24,
          }}
        >
          <FoodDetailHeader food={food} />

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <DateSelect date={datetime} onPress={() => null} />
            <MealSlotSelect mealSlot={mealSlot} onChangeSlot={setMealSlot} />
            <QuantitySelect
              quantity={quantity}
              onChangeQuantity={setQuantity}
            />
          </View>

          <View style={{ gap: 8 }}>
            <CardHeader title="Nährwerte" size={20}>
              <Text
                style={{
                  fontFamily: "Nunito",
                  color: colors.text,
                  fontSize: 20,
                  fontWeight: "800",
                }}
              >
                {totalCalories.toFixed(0)} kcal
              </Text>
            </CardHeader>
            <View style={{ gap: 12 }}>
              <NutritionBar
                name="Kohlenhydrate"
                value={totalCarbs}
                target={quantity}
                categoryColorProfile="carbs"
                showTargetLabel={false}
                showTargetRange={false}
              />
              <NutritionBar
                name="Fette"
                value={totalFat}
                target={quantity}
                categoryColorProfile="fat"
                showTargetLabel={false}
                showTargetRange={false}
              />
              <NutritionBar
                name="Proteine"
                value={totalProtein}
                target={quantity}
                categoryColorProfile="protein"
                showTargetLabel={false}
                showTargetRange={false}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => onAddFood(food)}
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 16,
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
      </Animated.View>
    </View>
  );
};

export default FoodDetailScreen;
