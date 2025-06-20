import FoodDetailHeader from "@/components/food/FoodDetailHeader";
import { DateSelect } from "@/components/meal-slots/DateSelect";
import MealSlotSelect from "@/components/meal-slots/MealSlotSelect";
import { QuantitySelect } from "@/components/meal-slots/QuantitySelect";
import { NutritionOverview } from "@/components/nutrition/NutritionOverview";
import DetailScreenScroll from "@/components/screens/DetailScreenScroll";
import { AddButton } from "@/components/shared/AddButton";
import CategoryIcon from "@/components/shared/icons/CategoryIcon";
import { foodCategories } from "@/constants/foodCategories";
import { MEAL_SLOTS } from "@/constants/mealSlots";
import { useTheme } from "@/providers/theme";
import { FoodCategoryId, FoodModel, MealSlot, MealSlotId } from "@/types";
import React, { useEffect, useState } from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
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
  onAddFood: (datetime: Date, mealSlot: MealSlotId, quantity: number) => void;
  addLabel?: string;
  initialEntryData?: initialEntryData | undefined;
  isLoading?: boolean;
}

const FoodDetailScreen = ({
  food,
  onAddFood,
  addLabel = "Hinzufügen",
  isLoading = false,
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
    if (isLoading) return;
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
      <DetailScreenScroll
        bottomButton={
          <AddButton
            onPress={() => onAddFood(datetime, mealSlot.id, quantity)}
            label={addLabel}
            insets={insets}
            loading={isLoading}
            disabled={isLoading || quantity <= 0 || !datetime || !mealSlot.id}
          />
        }
      >
        <FoodDetailHeader food={food} />

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <DateSelect date={datetime} onPress={() => null} />
          <MealSlotSelect mealSlot={mealSlot} onChangeSlot={setMealSlot} />
          <QuantitySelect quantity={quantity} onChangeQuantity={setQuantity} />
        </View>

        <NutritionOverview
          calories={totalCalories}
          carbs={totalCarbs}
          fat={totalFat}
          protein={totalProtein}
          target={quantity}
        />
      </DetailScreenScroll>
    </View>
  );
};

export default FoodDetailScreen;
