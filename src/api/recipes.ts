import { supabase } from "@/lib/supabase";
import {
  FoodItem,
  Recipe,
  RecipeModelForCreate,
  RecipeModelForUpdate,
} from "@/types";

export const createRecipe = async (
  newRecipe: RecipeModelForCreate
): Promise<Recipe> => {
  const { data, error } = await supabase
    .from("recipes")
    .insert(newRecipe)
    .select("*, recipe_ingredients: recipe_ingredients(*, food: food_id(*))")
    .single();
  if (error) throw error;
  if (!data) throw new Error("Recipe creation failed");

  return {
    id: data.id,
    name: data.name,
    description: data.description || "",
    servings: data.servings,
    ingredients: data.recipe_ingredients
      ? data.recipe_ingredients.map(
          (rc) =>
            ({
              id: rc.food_id,
              name: rc.food.name,
              description: rc.food.description || "",
              category: rc.food.category_id,
              calories_per_100: rc.food.kcal_per_100,
              protein_per_100: rc.food.protein_g_per_100,
              carbohydrates_per_100: rc.food.carbs_g_per_100,
              fat_per_100: rc.food.fat_g_per_100,
              quantity: rc.quantity_g,
            } as FoodItem)
        )
      : [],
  };
};

export const updateRecipe = async ({
  recipeId,
  updatedRecipe,
}: {
  recipeId: string;
  updatedRecipe: RecipeModelForUpdate;
}): Promise<Recipe> => {
  const { data, error } = await supabase
    .from("recipes")
    .update(updatedRecipe)
    .eq("id", recipeId)
    .select("*, recipe_ingredients: recipe_ingredients(*, food: food_id(*))")
    .single();
  if (error) throw error;
  if (!data) throw new Error("Recipe update failed");
  return {
    id: data.id,
    name: data.name,
    description: data.description || "",
    servings: data.servings,
    ingredients: data.recipe_ingredients
      ? data.recipe_ingredients.map(
          (rc) =>
            ({
              id: rc.food_id,
              name: rc.food.name,
              description: rc.food.description || "",
              category: rc.food.category_id,
              calories_per_100: rc.food.kcal_per_100,
              protein_per_100: rc.food.protein_g_per_100,
              carbohydrates_per_100: rc.food.carbs_g_per_100,
              fat_per_100: rc.food.fat_g_per_100,
              quantity: rc.quantity_g,
            } as FoodItem)
        )
      : [],
  };
};

export const getAllRecipes = async (userId: string): Promise<Recipe[]> => {
  const { data, error } = await supabase
    .from("recipes")
    .select("*, recipe_ingredients: recipe_ingredients(*, food: food_id(*))")
    .eq("user_id", userId)
    .order("name", { ascending: false });

  if (error) throw error;

  const recipes =
    data.length > 0
      ? data.map(
          (d) =>
            ({
              id: d.id,
              name: d.name,
              description: d.description || "",
              servings: d.servings,
              ingredients: d.recipe_ingredients
                ? d.recipe_ingredients.map(
                    (rc) =>
                      ({
                        id: rc.food_id,
                        name: rc.food.name,
                        description: rc.food.description || "",
                        category: rc.food.category_id,
                        calories_per_100: rc.food.kcal_per_100,
                        protein_per_100: rc.food.protein_g_per_100,
                        carbohydrates_per_100: rc.food.carbs_g_per_100,
                        fat_per_100: rc.food.fat_g_per_100,
                        quantity: rc.quantity_g,
                      } as FoodItem)
                  )
                : [],
            } as Recipe)
        )
      : [];

  return recipes;
};

export const getRecipeById = async (
  userId: string,
  recipeId: string
): Promise<Recipe | null> => {
  const { data, error } = await supabase
    .from("recipes")
    .select("*, recipe_ingredients: recipe_ingredients(*, food: food_id(*))")
    .eq("user_id", userId)
    .eq("id", recipeId)
    .single();

  if (error) throw error;

  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    description: data.description || "",
    servings: data.servings,
    ingredients: data.recipe_ingredients
      ? data.recipe_ingredients.map(
          (rc) =>
            ({
              id: rc.food_id,
              name: rc.food.name,
              description: rc.food.description || "",
              category: rc.food.category_id,
              calories_per_100: rc.food.kcal_per_100,
              protein_per_100: rc.food.protein_g_per_100,
              carbohydrates_per_100: rc.food.carbs_g_per_100,
              fat_per_100: rc.food.fat_g_per_100,
              quantity: rc.quantity_g,
            } as FoodItem)
        )
      : [],
  };
};
