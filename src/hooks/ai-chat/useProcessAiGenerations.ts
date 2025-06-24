import { createFood } from "@/api/foods";
import { createFoodMealEntry, createRecipeMealEntry } from "@/api/meal-entries";
import { addRecipeIngredientToRecipe } from "@/api/recipe-ingredients";
import { createRecipe } from "@/api/recipes";
import { useAuth } from "@/providers/auth";
import { FoodItem, MealSlotEntry, Recipe } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useProcessAiGenerations = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["aiGenerations", "process"],
    mutationFn: async (data: MealSlotEntry[]) => {
      console.log("Processing AI generations:", data);

      if (!user) {
        throw new Error("User not authenticated");
      }

      if (!data || data.length === 0) {
        throw new Error("No meal entries to process");
      }

      data.map(async (entry) => {
        if (entry.type === "food") {
          const food = entry.entry as FoodItem;
          const newFood = await createFood({
            food: {
              name: food.name,
              kcal_per_100: food.calories_per_100,
              carbs_g_per_100: food.carbohydrates_per_100,
              category_id: food.category,
              fat_g_per_100: food.fat_per_100,
              protein_g_per_100: food.protein_per_100,
              description: food.description || "",
              created_by: user.id,
            },
          });
          if (!newFood) {
            throw new Error("Failed to create food item");
          }
          await createFoodMealEntry({
            date: entry.date,
            slot: entry.mealSlot,
            foodId: newFood.id,
            quantityG: food.quantity,
            userId: user.id,
          });

          return;
        } else if (entry.type === "recipe") {
          const recipe = entry.entry as Recipe;
          const newRecipe = await createRecipe({
            name: recipe.name,
            description: recipe.description || "",
            servings: recipe.servings,
            user_id: user.id,
          });
          if (!newRecipe) {
            throw new Error("Failed to create recipe");
          }

          recipe.ingredients.forEach(async (ingredient) => {
            const newFood = await createFood({
              food: {
                name: ingredient.name,
                kcal_per_100: ingredient.calories_per_100,
                carbs_g_per_100: ingredient.carbohydrates_per_100,
                category_id: ingredient.category,
                fat_g_per_100: ingredient.fat_per_100,
                protein_g_per_100: ingredient.protein_per_100,
                description: ingredient.description || "",
                created_by: user.id,
              },
            });
            if (!newFood) {
              throw new Error("Failed to create food item for recipe");
            }
            await addRecipeIngredientToRecipe({
              recipe_id: newRecipe.id,
              food_id: newFood.id,
              quantity_g: ingredient.quantity,
            });
          });

          await createRecipeMealEntry({
            date: entry.date,
            slot: entry.mealSlot,
            recipeId: newRecipe.id,
            portions: recipe.servings,
            userId: user.id,
          });
          return;
        } else {
          console.error("Unknown entry type:", entry.type);
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mealEntries"],
      });
      queryClient.invalidateQueries({
        queryKey: ["daily-calories"],
        exact: false,
      });
    },
  });
};
