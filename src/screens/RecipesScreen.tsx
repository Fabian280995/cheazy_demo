import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import RecipesList from "@/components/recipes/RecipesList";
import { useRecipesQuery } from "@/hooks/recipes/useRecipesQuery";
import { useTheme } from "@/providers/theme";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import { Recipe } from "@/types";

const RecipesScreen = () => {
  const { data: recipes, isLoading, error } = useRecipesQuery();
  const { mealSlotId } = useLocalSearchParams<{
    mealSlotId?: string;
  }>();

  const handleRecipeSelect = (recipe: Recipe) => {
    console.log("Selected recipe ID:", recipe);
    // Navigate to recipe detail screen or perform any action with the selected recipe
  };
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
