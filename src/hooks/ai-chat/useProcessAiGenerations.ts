import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod/v4";

import {
  createFood,
  createFoodMealEntry,
  createRecipe,
  createRecipeMealEntry,
  addRecipeIngredientToRecipe,
} from "@/api";
import { useAuth } from "@/providers/auth";
import { FoodItem, MealSlotEntry, Recipe } from "@/types";

/* ------------------------------------------------------------------
 * Zod v4 Schemas ----------------------------------------------------
 * ------------------------------------------------------------------*/
// 1️⃣ Enum‑Liste der Meal‑Slots direkt definieren (oder via Constants)
const MealSlotIdSchema = z.enum([
  "breakfast",
  "morning_snack",
  "lunch",
  "afternoon_snack",
  "dinner",
  "night_snack",
]);

// 2️⃣ FoodItem – category ist STRING‑ID, kein Integer!
const FoodItemSchema = z.object({
  id: z.string().optional(), // optional ‑ wird beim Anlegen generiert
  name: z.string().min(1),
  description: z.string().optional(),
  calories_per_100: z.number().nonnegative(),
  protein_per_100: z.number().nonnegative(),
  carbohydrates_per_100: z.number().nonnegative(),
  fat_per_100: z.number().nonnegative(),
  quantity: z.number().positive(),
  category: z.string().min(1),
});

// 3️⃣ Recipe + Ingredients
const RecipeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  servings: z.number().int().positive(),
  ingredients: z.array(
    FoodItemSchema.omit({ quantity: true }).extend({
      quantity: z.number().positive(),
    })
  ),
});

// 4️⃣ MealSlotEntry (id ist **Pflicht**!)
const MealSlotEntrySchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("food"),
    id: z.string(), // Pflichtfeld für Entry‑ID
    date: z.coerce.date(),
    mealSlot: MealSlotIdSchema,
    portions: z.number().positive(),
    entry: FoodItemSchema,
  }),
  z.object({
    type: z.literal("recipe"),
    id: z.string(),
    date: z.coerce.date(),
    mealSlot: MealSlotIdSchema,
    portions: z.number().positive(),
    entry: RecipeSchema,
  }),
]);

type MealSlotEntryInput = z.infer<typeof MealSlotEntrySchema>; // strikt aus Schema

/* ------------------------------------------------------------------
 * Hook --------------------------------------------------------------
 * ------------------------------------------------------------------*/
export const useProcessAiGenerations = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["aiGenerations", "process", { userId: user?.id }],
    mutationFn: async (rawData: MealSlotEntry[]) => {
      if (!user) throw new Error("User not authenticated");

      // 1️⃣ Validate ---------------------------------------------------------
      const parseResult = z.array(MealSlotEntrySchema).safeParse(rawData);
      if (!parseResult.success) throw parseResult.error;
      const data = parseResult.data as MealSlotEntryInput[];

      // 2️⃣ Process Entries in Batches (size = 5) ---------------------------
      const BATCH_SIZE = 5;

      const processEntry = async (entry: MealSlotEntryInput) => {
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
              description: food.description ?? "",
              created_by: user.id,
            },
          });

          await createFoodMealEntry({
            date: entry.date,
            slot: entry.mealSlot,
            foodId: newFood.id,
            quantityG: food.quantity,
            userId: user.id,
          });
          return;
        }

        // ----- Recipe Branch ----------------------------------------------
        const recipe = entry.entry as Recipe;
        const newRecipe = await createRecipe({
          name: recipe.name,
          description: recipe.description ?? "",
          servings: recipe.servings,
          user_id: user.id,
        });

        await Promise.all(
          recipe.ingredients.map(async (ingredient) => {
            const newFood = await createFood({
              food: {
                name: ingredient.name,
                kcal_per_100: ingredient.calories_per_100,
                carbs_g_per_100: ingredient.carbohydrates_per_100,
                category_id: ingredient.category,
                fat_g_per_100: ingredient.fat_per_100,
                protein_g_per_100: ingredient.protein_per_100,
                description: ingredient.description ?? "",
                created_by: user.id,
              },
            });
            await addRecipeIngredientToRecipe({
              recipe_id: newRecipe.id,
              food_id: newFood.id,
              quantity_g: ingredient.quantity,
            });
          })
        );

        await createRecipeMealEntry({
          date: entry.date,
          slot: entry.mealSlot,
          recipeId: newRecipe.id,
          portions: entry.portions,
          userId: user.id,
        });
      };

      for (let i = 0; i < data.length; i += BATCH_SIZE) {
        const batch = data.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(processEntry));
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mealEntries"] });
      queryClient.invalidateQueries({
        queryKey: ["daily-calories"],
        exact: false,
      });
    },
  });
};
