import RecipeDetails from "@/components/recipes/RecipeDetails";
import { useRecipe } from "@/providers/recipe";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const RecipeDetailScreen = () => {
  const { recipe } = useRecipe();
  const { mealEntryId } = useLocalSearchParams<{
    mealEntryId?: string;
    mealSlotId?: string;
  }>();
  return (
    <RecipeDetails
      recipe={recipe}
      onAddRecipe={() => {}}
      addLabel={mealEntryId ? "Eintrag aktualisieren" : "Rezept hinzufügen"}
    />
  );
};

export default RecipeDetailScreen;
