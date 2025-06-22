import { FoodItem } from "./food";
import { Tables } from "./supabase";

export type RecipeModel = Tables<"recipes">;
export type RecipeModelForCreate = Omit<RecipeModel, "id">;

export type RecipeIngredient = Tables<"recipe_ingredients">;
export type RecipeIngredientForCreate = RecipeIngredient;

export type Recipe = {
  id: string;
  name: string;
  description?: string;
  ingredients: FoodItem[];
  servings: number;
};
