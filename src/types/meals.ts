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

export type FoodItem = {
  id: string;
  name: string;
  description?: string;
  calories_per_100: number;
  protein_per_100: number;
  carbohydrates_per_100: number;
  fat_per_100: number;
  quantity: number;
};

export type Recipe = {
  id: string;
  name: string;
  description?: string;
  ingredients: FoodItem[];
};

export type MealSlotEntry = {
  date: string;
  mealSlot: MealSlotId;
  entry: FoodItem | Recipe;
};
