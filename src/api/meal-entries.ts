import { MEAL_SLOTS } from "@/constants/mealSlots";
import { supabase } from "@/lib/supabase";
import { FoodItem, MealSlotEntry, Recipe } from "@/types";

export async function getMealEntryById(id: string) {
  const { data, error } = await supabase
    .from("meal_entries")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  if (!data) throw new Error(`Meal entry with ID ${id} not found`);

  return data;
}

export async function getMealEntriesByDiaryRecordId(
  diaryRecordId: string
): Promise<MealSlotEntry[]> {
  const { data, error } = await supabase
    .from("meal_entries")
    .select(
      "*, food: food_id(*), recipe: recipe_id(*, recipe_components: recipe_components(*, food: food_id(*)))"
    )
    .eq("diary_record_id", diaryRecordId);

  if (error) {
    console.error("Error fetching meal entries:", error);
    return [];
  }

  if (!data) return [];

  const mealSlotEntries: MealSlotEntry[] = data.map((entry) => {
    return {
      id: entry.id, // Assuming today's date for simplicity, adjust as needed
      mealSlot:
        MEAL_SLOTS.find(
          (slot) => slot.id.toLowerCase() === entry.slot.toLowerCase()
        )?.id || "Breakfast",
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
              ingredients: entry.recipe.recipe_components
                ? entry.recipe.recipe_components.map(
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
