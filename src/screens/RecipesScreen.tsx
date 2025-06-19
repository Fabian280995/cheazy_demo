import RecipesList from "@/components/recipes/RecipesList";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import { useRecipesQuery } from "@/hooks/recipes/useRecipesQuery";
import { Recipe } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

const RecipesScreen = () => {
  const { data: recipes, isLoading, error } = useRecipesQuery();
  const { mealSlotId } = useLocalSearchParams<{
    mealSlotId?: string;
  }>();

  const handleRecipeSelect = (recipe: Recipe) => {
    console.log("Selected recipe ID:", recipe);
    // Navigate to recipe detail screen or perform any action with the selected recipe
  };

  if (error) {
    console.error("Error loading recipes:", error);
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 32,
      }}
    >
      {isLoading && <LoadingIndicator />}
      <RecipesList recipes={recipes || []} onSelect={handleRecipeSelect} />
    </ScrollView>
  );
};

export default RecipesScreen;
