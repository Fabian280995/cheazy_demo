import { RecipeIngredientForCreate } from "@/types/recipes";
import { supabase } from "@/lib/supabase";

export const addRecipeIngredientToRecipe = async (
  ingredient: RecipeIngredientForCreate
) => {
  const { data, error } = await supabase
    .from("recipe_ingredients")
    .insert(ingredient)
    .select("*")
    .single();
  if (error) {
    console.error("Error adding recipe ingredient:", error);
    throw error;
  }
  return data;
};

export const deleteRecipeIngredient = async ({
  recipeId,
  foodId,
}: {
  recipeId: string;
  foodId: string;
}) => {
  const { data, error } = await supabase
    .from("recipe_ingredients")
    .delete()
    .eq("recipe_id", recipeId)
    .eq("food_id", foodId)
    .select("*")
    .single();
  if (error) {
    console.error("Error deleting recipe ingredient:", error);
    throw error;
  }
  return data;
};

export const updateRecipeIngredient = async (
  id: string,
  ingredient: Partial<RecipeIngredientForCreate>
) => {
  const { data, error } = await supabase
    .from("recipe_ingredients")
    .update(ingredient)
    .eq("id", id)
    .select("*")
    .single();
  if (error) {
    console.error("Error updating recipe ingredient:", error);
    throw error;
  }
  return data;
};

export const getRecipeIngredientByRecipeCompId = async ({
  recipeId,
  foodId,
}: {
  recipeId: string;
  foodId: string;
}) => {
  const { data, error } = await supabase
    .from("recipe_ingredients")
    .select("*")
    .eq("recipe_id", recipeId)
    .eq("food_id", foodId)
    .single();
  if (error) {
    throw error;
  }
  return data;
};
