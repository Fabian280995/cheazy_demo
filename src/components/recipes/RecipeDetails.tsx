import { MEAL_SLOTS } from "@/constants/mealSlots";
import { useTheme } from "@/providers/theme";
import { MealSlotId, NutritionTotals, Recipe } from "@/types";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FoodItemCard } from "../food/FoodItemCard";
import { DateSelect } from "../meal-slots/DateSelect";
import MealSlotSelect from "../meal-slots/MealSlotSelect";
import { QuantitySelect } from "../meal-slots/QuantitySelect";
import { NutritionOverview } from "../nutrition/NutritionOverview";
import DetailScreenHeader from "../screens/DetailScreenHeader";
import DetailScreenScroll from "../screens/DetailScreenScroll";
import { AddButton } from "../shared/AddButton";
import ListItem from "../shared/list/ListItem";

interface Props {
  recipe: Recipe;
  onAddRecipe: (datetime: Date, mealSlot: MealSlotId, portions: number) => void;
  addLabel?: string;
  isLoading?: boolean;
}

const RecipeDetails = ({
  recipe,
  onAddRecipe,
  addLabel = "Hinzufügen",
  isLoading = false,
}: Props) => {
  const { colors } = useTheme();
  const height = useWindowDimensions().height;
  const insets = useSafeAreaInsets();
  const { ingredients } = recipe;

  const [datetime, setDatetime] = useState(new Date());
  const [mealSlot, setMealSlot] = useState(MEAL_SLOTS[0]);
  const [portions, setPortions] = React.useState<number>(1);
  const quantity = React.useMemo(() => {
    return ingredients.reduce((acc, item) => acc + item.quantity, 0);
  }, [ingredients]);
  const totalQuantity = quantity * portions;

  const totals: NutritionTotals = React.useMemo(() => {
    return ingredients.reduce(
      (acc, item) => {
        acc.calories += ((item.calories_per_100 * quantity) / 100) * portions;
        acc.carbs += ((item.carbohydrates_per_100 * quantity) / 100) * portions;
        acc.fat += ((item.fat_per_100 * quantity) / 100) * portions;
        acc.protein += ((item.protein_per_100 * quantity) / 100) * portions;
        return acc;
      },
      { calories: 0, carbs: 0, fat: 0, protein: 0 }
    );
  }, [ingredients, quantity, portions]);

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
          backgroundColor: colors.background,
        }}
      >
        {true && (
          <View
            style={{
              width: "100%",
              height: height / 3 + 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name="camera" size={64} color={colors.textLight} />
          </View>
        )}
      </View>
      <DetailScreenScroll
        bottomButton={
          <AddButton
            onPress={() => onAddRecipe(datetime, mealSlot.id, portions)}
            label={addLabel}
            insets={insets}
            loading={isLoading}
            disabled={isLoading || portions <= 0 || !datetime || !mealSlot.id}
          />
        }
      >
        <DetailScreenHeader
          title={recipe.name}
          description={recipe.description}
        />

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <DateSelect date={datetime} onPress={() => null} />
          <MealSlotSelect mealSlot={mealSlot} onChangeSlot={setMealSlot} />
          <QuantitySelect
            quantity={portions}
            onChangeQuantity={setPortions}
            step={1}
          />
        </View>

        <NutritionOverview
          calories={totals.calories}
          carbs={totals.carbs}
          fat={totals.fat}
          protein={totals.protein}
          target={totalQuantity}
        />

        <Animated.View layout={LinearTransition} key="ingredients">
          {ingredients.map((item) => {
            return (
              <ListItem isFirst={item === ingredients[0]} key={item.id}>
                <FoodItemCard item={item} />
              </ListItem>
            );
          })}
        </Animated.View>
      </DetailScreenScroll>
    </View>
  );
};

export default RecipeDetails;
