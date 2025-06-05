// src/types/models.ts

/** Stammdaten für einen FoodItem (Masterlist) */
export interface FoodItem {
  id: string;
  name: string;
  default_unit: string; // 'g', 'piece', ...
  calories_per_100g: number;
  protein_per_100g: number;
  carbs_per_100g: number;
  fat_per_100g: number;
}

/** Eine Verknüpfung eines Dish mit einem FoodItem und Menge */
export interface DishItem {
  food_item_id: string;
  quantity: number;
  unit: string;
  // Optional Override, wenn AI andere Nährwerte liefert
  override_calories?: number;
  override_protein?: number;
  override_carbs?: number;
  override_fat?: number;
}

/** Ein konkretes Gericht in einer Mahlzeit */
export interface Dish {
  id: string;
  daily_log_id: string;
  meal_slot_id: string; // z. B. 'Breakfast', 'Lunch', ...
  name: string; // z. B. 'Sandwich mit Hühnerbrust'
  notes?: string;
  timestamp?: string;
  items: DishItem[]; // Zusammensetzung des Gerichts
}

/** Eine Tagesübersicht für einen Nutzer */
export interface DailyLog {
  id: string;
  user_id: string;
  date: string; // ISO-String, z. B. '2025-06-05'
  dishes: Dish[]; // Alle Gerichte an diesem Tag
}

/** Mögliche MealSlot-Typen */
export type MealSlotId =
  | "Breakfast"
  | "MorningSnack"
  | "Lunch"
  | "AfternoonSnack"
  | "Dinner"
  | "EveningSnack";
