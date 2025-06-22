import { FoodItemCard } from "@/components/food/FoodItemCard";
import AddEntryButton from "@/components/meal-slots/AddEntryButton";
import { NutritionOverview } from "@/components/nutrition/NutritionOverview";
import RecipeDetails from "@/components/recipes/RecipeDetails";
import DetailScreenScroll from "@/components/screens/DetailScreenScroll";
import CardHeader from "@/components/shared/CardHeader";
import { SwipeableListItem } from "@/components/shared/list/ListItem";
import { useDeleteRecipeIngredient } from "@/hooks/recipe-ingredients/useDeleteRecipeIngredient";
import { useRecipe } from "@/providers/recipe";
import { useTheme } from "@/providers/theme";
import { NutritionTotals } from "@/types";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

const RecipeDetailScreen = () => {
  const { recipe } = useRecipe();
  const { colors } = useTheme();
  const router = useRouter();
  const height = useWindowDimensions().height;
  const { ingredients } = recipe;
  const [servings, setServings] = React.useState<number>(recipe.servings);

  const { mutateAsync: removeIngredient, isPending: isRemoving } =
    useDeleteRecipeIngredient();

  const quantity = React.useMemo(() => {
    return ingredients.reduce((acc, item) => acc + item.quantity, 0);
  }, [ingredients]);
  const totalQuantity = quantity / servings;

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
  }, [ingredients, quantity, servings]);

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

  useEffect(() => {
    if (recipe) {
      setServings(recipe.servings);
    }
  }, [recipe]);

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
        <RecipeDetails
          recipe={recipe}
          servings={servings}
          onServingsChange={setServings}
        />
        <NutritionOverview
          title={"Nährwerte pro Portion"}
          calories={totals.calories / servings}
          carbs={totals.carbs / servings}
          fat={totals.fat / servings}
          protein={totals.protein / servings}
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

export default RecipeDetailScreen;
