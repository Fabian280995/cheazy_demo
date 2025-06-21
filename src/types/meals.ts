import { FoodItem } from "./food";
import { Recipe } from "./recipes";
import { Database } from "./supabase";

export type MealSlotId = Database["public"]["Enums"]["meal_slot"];

export type MealSlot = {
  id: MealSlotId;
  label: string;
  sortOrder: number;
};

export type MealSlotEntry = {
  id: string;
  date: Date;
  mealSlot: MealSlotId;
  entry: FoodItem | Recipe;
  type: "food" | "recipe";
};

export type NutritionTotals = {
  calories: number; // kcal
  protein: number; // g
  carbs: number; // g
  fat: number; // g
};
