import FoodDetailHeader from "@/components/food/FoodDetailHeader";
import { DateSelect } from "@/components/meal-slots/DateSelect";
import MealSlotSelect from "@/components/meal-slots/MealSlotSelect";
import { QuantitySelect } from "@/components/meal-slots/QuantitySelect";
import { NutritionOverview } from "@/components/nutrition/NutritionOverview";
import DetailScreenScroll from "@/components/screens/DetailScreenScroll";
import CategoryIcon from "@/components/shared/icons/CategoryIcon";
import { foodCategories } from "@/constants/foodCategories";
import { useTheme } from "@/providers/theme";
import { FoodCategoryId, FoodModel, MealSlot } from "@/types";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  food: FoodModel;
  quantity?: number;
}

const FoodDetailScreen = ({ food, quantity = 100 }: Props) => {
  const { colors } = useTheme();
  const height = useWindowDimensions().height;
  const insets = useSafeAreaInsets();

  const category = foodCategories.find((cat) => cat.id === food.category_id);
  const totalCalories = (food.kcal_per_100 * quantity) / 100;
  const totalCarbs = food.carbs_g_per_100 * (quantity / 100);
  const totalFat = food.fat_g_per_100 * (quantity / 100);
  const totalProtein = food.protein_g_per_100 * (quantity / 100);

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
              height: height / 4 + 32,
              backgroundColor: category.backgroundColor,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 16,
            }}
          >
            <CategoryIcon
              id={food.category_id as FoodCategoryId}
              size={96}
              colorfull
            />
          </View>
        )}
      </View>
      <DetailScreenScroll>
        <FoodDetailHeader food={food} />

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
