import { useTheme } from "@/providers/theme";
import { NutritionTotals, Recipe } from "@/types";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { FoodItemCard } from "../food/FoodItemCard";
import AddEntryButton from "../meal-slots/AddEntryButton";
import { QuantitySelect } from "../meal-slots/QuantitySelect";
import { NutritionOverview } from "../nutrition/NutritionOverview";
import DetailScreenHeader from "../screens/DetailScreenHeader";
import DetailScreenScroll from "../screens/DetailScreenScroll";
import CardHeader from "../shared/CardHeader";
import { SwipeableListItem } from "../shared/list/ListItem";
import { useDeleteRecipeIngredient } from "@/hooks/recipe-ingredients/useDeleteRecipeIngredient";

interface Props {
  recipe: Recipe;
}

const RecipeDetails = ({ recipe }: Props) => {
  const { colors } = useTheme();
  const router = useRouter();
  const height = useWindowDimensions().height;
  const { ingredients } = recipe;

  const { mutateAsync: removeIngredient, isPending: isRemoving } =
    useDeleteRecipeIngredient();

  const [portions, setPortions] = React.useState<number>(recipe.servings);
  const quantity = React.useMemo(() => {
    return ingredients.reduce((acc, item) => acc + item.quantity, 0);
  }, [ingredients]);
  const totalQuantity = quantity / portions;

  const totals: NutritionTotals = React.useMemo(() => {
    return ingredients.reduce(
      (acc, item) => {
        acc.calories += item.calories_per_100 * (item.quantity / 100);
        acc.carbs += item.carbohydrates_per_100 * (item.quantity / 100);
        acc.fat += item.fat_per_100 * (item.quantity / 100);
        acc.protein += item.protein_per_100 * (item.quantity / 100);
        return acc;
      },
      { calories: 0, carbs: 0, fat: 0, protein: 0 }
    );
  }, [ingredients, quantity, portions]);

  const handleAddIngredient = () => {
    router.push(`/recipes/${recipe.id}/foods`);
  };

  const handleDeleteIngredient = async (foodId: string) => {
    await removeIngredient({
      recipeId: recipe.id,
      foodId,
    });
  };

  const handleIngredientPress = (foodId: string) => {
    router.push(`/recipes/${recipe.id}/foods/${foodId}`);
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

        <View style={{}}>
          <CardHeader title="Portionen" size={20} />
          <QuantitySelect
            quantity={portions}
            onChangeQuantity={setPortions}
            step={1}
          />
        </View>

        <NutritionOverview
          title={"Nährwerte pro Portion"}
          calories={totals.calories / portions}
          carbs={totals.carbs / portions}
          fat={totals.fat / portions}
          protein={totals.protein / portions}
          target={totalQuantity}
        />

        <Animated.View layout={LinearTransition} key="ingredients">
          <CardHeader title="Zutaten" size={20} />
          <AddEntryButton
            id={"add-button"}
            onPress={handleAddIngredient}
            style={{
              paddingHorizontal: 0,
              borderBottomWidth: 0,
            }}
            isFirst
          />
          {ingredients.map((item) => {
            return (
              <SwipeableListItem
                isLast={item === ingredients[ingredients.length - 1]}
                key={item.id}
                onPress={() => handleIngredientPress(item.id)}
                onDelete={() => handleDeleteIngredient(item.id)}
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
