import { MEAL_SLOTS } from "@/constants/mealSlots";
import { useTheme } from "@/providers/theme";
import { MealSlotId, NutritionTotals, Recipe } from "@/types";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FoodItemCard } from "../food/FoodItemCard";
import AddEntryButton from "../meal-slots/AddEntryButton";
import { DateSelect } from "../meal-slots/DateSelect";
import MealSlotSelect from "../meal-slots/MealSlotSelect";
import { QuantitySelect } from "../meal-slots/QuantitySelect";
import { NutritionOverview } from "../nutrition/NutritionOverview";
import DetailScreenHeader from "../screens/DetailScreenHeader";
import DetailScreenScroll from "../screens/DetailScreenScroll";
import { AddButton } from "../shared/AddButton";
import { SwipeableListItem } from "../shared/list/ListItem";
import { useRouter } from "expo-router";

interface Props {
  recipe: Recipe;
  onAddRecipe: (datetime: Date, mealSlot: MealSlotId, portions: number) => void;
  addLabel?: string;
}

const RecipeDetails = ({
  recipe,
  onAddRecipe,
  addLabel = "Hinzufügen",
}: Props) => {
  const { colors } = useTheme();
  const router = useRouter();
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

  const handleAddEntryButtonPress = () => {
    router.push(`/recipes/${recipe.id}/foods`);
  };

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
          paddingTop: 16,
        }}
      >
        {true && (
          <View
            style={{
              width: "100%",
              height: height / 4 + 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name="camera" size={64} color={colors.textLight} />
          </View>
        )}
      </View>
      <DetailScreenScroll>
        <DetailScreenHeader
          title={recipe.name}
          description={recipe.description}
        />

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <DateSelect date={datetime} onPress={setDatetime} />
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
          <AddEntryButton
            id={"add-button"}
            onPress={handleAddEntryButtonPress}
            style={{
              paddingHorizontal: 0,
              borderBottomWidth: 0,
            }}
            isFirst
          />
          {ingredients.map((item) => {
            return (
              <SwipeableListItem
                isFirst={item === ingredients[0]}
                isLast={item === ingredients[ingredients.length - 1]}
                key={item.id}
                onPress={() => console.log("Ingredient pressed", item.name)}
                onDelete={() => console.log("Delete ingredient", item.name)}
                style={{ paddingHorizontal: 0 }}
              >
                <FoodItemCard item={item} />
              </SwipeableListItem>
            );
          })}
        </Animated.View>
      </DetailScreenScroll>
    </View>
  );
};

export default RecipeDetails;
