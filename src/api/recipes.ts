import { supabase } from "@/lib/supabase";
import { FoodItem, Recipe } from "@/types";

export const getAllRecipes = async (userId: string): Promise<Recipe[]> => {
  const { data, error } = await supabase
    .from("recipes")
    .select("*, recipe_components: recipe_components(*, food: food_id(*))")
    .eq("user_id", userId)
    .order("name", { ascending: false });

  if (error) throw error;

  const recipes =
    data.length > 0
      ? data.map(
          (d) =>
            ({
              id: d.id,
              name: d.name,
              description: d.description || "",
              ingredients: d.recipe_components
                ? d.recipe_components.map(
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
        )
      : [];

  return recipes;
};
