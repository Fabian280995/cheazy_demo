import { Tables } from "./supabase";

export type RecipeModel = Tables<"recipes">;

export type RecipeIngredient = Tables<"recipe_ingredients">;
export type RecipeIngredientForCreate = RecipeIngredient;
