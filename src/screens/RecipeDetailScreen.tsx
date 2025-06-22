import RecipeDetails from "@/components/recipes/RecipeDetails";
import { useRecipe } from "@/providers/recipe";
import React from "react";

const RecipeDetailScreen = () => {
  const { recipe } = useRecipe();
  return <RecipeDetails recipe={recipe} />;
};

export default RecipeDetailScreen;
