import { FoodItem } from "./food";

export type MealSlotId =
  | "Breakfast"
  | "MorningSnack"
  | "Lunch"
  | "AfternoonSnack"
  | "Dinner"
  | "EveningSnack";

export type MealSlot = {
  id: MealSlotId;
  label: string;
  sortOrder: number;
};

export type Recipe = {
  id: string;
  name: string;
  description?: string;
  ingredients: FoodItem[];
};

export type MealSlotEntry = {
  id: string;
  date: Date;
  mealSlot: MealSlotId;
  entry: FoodItem | Recipe;
};

export type NutritionTotals = {
  calories: number; // kcal
  protein: number; // g
  carbs: number; // g
  fat: number; // g
};
