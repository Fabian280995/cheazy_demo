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
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
};

export type Recipe = {
  id: string;
  name: string;
  description?: string;
  ingredients: FoodItem[];
};

export type MealSlotEntry = FoodItem | Recipe;

export type MealLog = {
  date: string;
  mealSlot: MealSlotId;
  entry: MealSlotEntry;
};
