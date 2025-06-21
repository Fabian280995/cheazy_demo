import { MEAL_SLOTS } from "@/constants/mealSlots";
import { supabase } from "@/lib/supabase";
import {
  FoodItem,
  MeaLEntryModel,
  MealSlotEntry,
  MealSlotId,
  Recipe,
} from "@/types";
import { format } from "date-fns";

export async function getMealEntryById(id: string): Promise<MeaLEntryModel> {
  const { data, error } = await supabase
    .from("meal_entries")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  if (!data) throw new Error(`Meal entry with ID ${id} not found`);

  return data;
}

export async function createFoodMealEntry({
  date,
  slot,
  foodId,
  quantityG,
  userId,
}: {
  date: Date;
  slot: MealSlotId;
  foodId: string;
  quantityG: number;
  userId: string;
}): Promise<MeaLEntryModel> {
  const formattedDate = format(date, "yyyy-MM-dd"); // z.B. mit date-fns // Format date to YYYY-MM-DD
  const { data, error } = await supabase
    .from("meal_entries")
    .insert({
      date: formattedDate,
      slot,
      entry_type: "food",
      food_id: foodId,
      quantity_g: quantityG,
      user_id: userId,
    })
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function updateFoodMealEntry({
  id,
  date,
  slot,
  foodId,
  quantityG,
}: {
  id: string;
  date: Date;
  slot: MealSlotId;
  foodId: string;
  quantityG: number;
}): Promise<MeaLEntryModel> {
  const formattedDate = format(date, "yyyy-MM-dd"); // z.B. mit date-fns // Format date to YYYY-MM-DD
  const { data, error } = await supabase
    .from("meal_entries")
    .update({
      date: formattedDate,
      slot,
      entry_type: "food",
      food_id: foodId,
      quantity_g: quantityG,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function createRecipeMealEntry({
  date,
  slot,
  recipeId,
  userId,
  portions,
}: {
  date: Date;
  slot: MealSlotId;
  recipeId: string;
  userId: string;
  portions: number;
}): Promise<MeaLEntryModel> {
  const formattedDate = format(date, "yyyy-MM-dd"); // z.B. mit date-fns // Format date to YYYY-MM-DD
  const { data, error } = await supabase
    .from("meal_entries")
    .insert({
      date: formattedDate,
      slot,
      entry_type: "recipe",
      recipe_id: recipeId,
      user_id: userId,
      portions,
    })
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function updateRecipeMealEntry({
  id,
  date,
  slot,
  recipeId,
  portions,
}: {
  id: string;
  date: Date;
  slot: MealSlotId;
  recipeId: string;
  portions: number;
}): Promise<MeaLEntryModel> {
  const formattedDate = format(date, "yyyy-MM-dd"); // z.B. mit date-fns // Format date to YYYY-MM-DD
  const { data, error } = await supabase
    .from("meal_entries")
    .update({
      date: formattedDate,
      slot,
      entry_type: "recipe",
      recipe_id: recipeId,
      portions,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function deleteMealEntry(id: string): Promise<void> {
  const { error } = await supabase.from("meal_entries").delete().eq("id", id);
  if (error) throw error;
}

export async function getMealSlotEntriesByDate(
  date: Date
): Promise<MealSlotEntry[]> {
  const formattedDate = format(date, "yyyy-MM-dd"); // z.B. mit date-fns // Format date to YYYY-MM-DD
  const { data, error } = await supabase
    .from("meal_entries")
    .select(
      "*, food: food_id(*), recipe: recipe_id(*, recipe_ingredients: recipe_ingredients(*, food: food_id(*)))"
    )
    .eq("date", formattedDate);

  if (error) {
    console.error("Error fetching meal entries:", error);
    return [];
  }

  if (!data) return [];

  const mealSlotEntries: MealSlotEntry[] = data.map((entry) => {
    return {
      id: entry.id,
      date: new Date(entry.date),
      type: entry.entry_type,
      mealSlot:
        MEAL_SLOTS.find(
          (slot) => slot.id.toLowerCase() === entry.slot.toLowerCase()
        )?.id || "breakfast", // Default to breakfast if not found
      entry:
        entry.entry_type === "food" && entry.food
          ? ({
              id: entry.food.id,
              name: entry.food.name,
              description: entry.food.description || "",

              calories_per_100: entry.food.kcal_per_100,
              protein_per_100: entry.food.protein_g_per_100,
              carbohydrates_per_100: entry.food.carbs_g_per_100,
              fat_per_100: entry.food.fat_g_per_100,
              quantity: entry.quantity_g,
              category: entry.food.category_id,
            } as FoodItem)
          : entry.entry_type === "recipe" && entry.recipe
          ? ({
              id: entry.recipe.id,
              name: entry.recipe.name,
              description: entry.recipe.description,
              ingredients: entry.recipe.recipe_ingredients
                ? entry.recipe.recipe_ingredients.map(
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
          : ({} as FoodItem | Recipe),
    };
  });

  return mealSlotEntries || [];
}
