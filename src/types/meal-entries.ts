import { Tables } from "./supabase";

export type MealEntryType = "food" | "recipe";

export type MeaLEntryModel = Tables<"meal_entries">;
