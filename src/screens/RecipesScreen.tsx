import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import RecipesList from "@/components/recipes/RecipesList";
import { useRecipesQuery } from "@/hooks/recipes/useRecipesQuery";
import { useTheme } from "@/providers/theme";

const RecipesScreen = () => {
  const { colors } = useTheme();
  const { data: recipes, isLoading, error } = useRecipesQuery();
  const { mealSlotId } = useLocalSearchParams<{
    mealSlotId?: string;
  }>();

  const handleRecipeSelect = (recipeId: string) => {
    console.log("Selected recipe ID:", recipeId);
    // Navigate to recipe detail screen or perform any action with the selected recipe
  };
  return (
    <View>
      <RecipesList recipes={recipes || []} />
    </View>
  );
};

export default RecipesScreen;
