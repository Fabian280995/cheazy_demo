import { isFoodItem } from "@/components/meal-slots/MealSlotEntry";
import { MEAL_SLOTS } from "@/constants/mealSlots";
import {
  FoodItem,
  MealSlotEntry,
  MealSlotId,
  NutritionTotals,
  Recipe,
} from "@/types";

// Hilfsmapping: MealSlotId → sortOrder
const slotOrderMap: Record<MealSlotId, number> = MEAL_SLOTS.reduce(
  (acc, slot) => ({ ...acc, [slot.id]: slot.sortOrder }),
  {} as Record<MealSlotId, number>
);

// 1. Flaches, sortiertes Array
export function sortEntriesFlat(entries: MealSlotEntry[]): MealSlotEntry[] {
  return [...entries].sort(
    (a, b) => slotOrderMap[a.mealSlot] - slotOrderMap[b.mealSlot]
  );
}

// 2. Gruppiertes Objekt: { [slotId]: MealSlotEntry[] }
export function groupEntriesBySlot(
  entries: MealSlotEntry[]
): Record<MealSlotId, MealSlotEntry[]> {
  // Erst alle Gruppen initialisieren, damit auch leere Slots da sind
  const grouped: Record<MealSlotId, MealSlotEntry[]> = MEAL_SLOTS.reduce(
    (acc, slot) => ({ ...acc, [slot.id]: [] }),
    {} as Record<MealSlotId, MealSlotEntry[]>
  );

  entries.forEach((entry) => {
    grouped[entry.mealSlot].push(entry);
  });

  // // Innerhalb jeder Gruppe optional nach Datum oder anderen Kriterien sortieren
  // for (const slotId of Object.keys(grouped) as MealSlotId[]) {
  //   grouped[slotId].sort((a, b) => a..localeCompare(b.date));
  // }

  return grouped;
}

/**
 * Liefert die Nährwerte für ein einzelnes FoodItem
 * (Menge wird als Gramm interpretiert).
 */
const getNutritionForFoodItem = (item: FoodItem): NutritionTotals => {
  const factor = item.quantity / 100; // Menge relativ zu 100 g
  return {
    calories: item.calories_per_100 * factor,
    protein: item.protein_per_100 * factor,
    carbs: item.carbohydrates_per_100 * factor,
    fat: item.fat_per_100 * factor,
  };
};

/**
 * Liefert die Nährwerte für Recipe **oder** FoodItem.
 * Für ein Recipe werden die Zutaten rekursiv aufsummiert.
 */
const getNutritionForEntry = (entry: FoodItem | Recipe): NutritionTotals => {
  if (isFoodItem(entry)) {
    return getNutritionForFoodItem(entry);
  }

  // Entry ist ein Recipe
  return entry.ingredients.reduce<NutritionTotals>(
    (acc, ingredient) => {
      const n = getNutritionForFoodItem(ingredient);
      return {
        calories: acc.calories + n.calories,
        protein: acc.protein + n.protein,
        carbs: acc.carbs + n.carbs,
        fat: acc.fat + n.fat,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
};

/**
 * Summiert die Nährwerte aller MealSlot-Entries.
 */
export const calcTotals = (entries: MealSlotEntry[]): NutritionTotals =>
  entries.reduce<NutritionTotals>(
    (acc, { entry }) => {
      const n = getNutritionForEntry(entry);
      return {
        calories: acc.calories + n.calories,
        protein: acc.protein + n.protein,
        carbs: acc.carbs + n.carbs,
        fat: acc.fat + n.fat,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
