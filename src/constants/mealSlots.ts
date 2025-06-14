import { MealSlot, MealSlotEntry } from "@/types";
import {
  FoodCategoryId as Cat, // Alias für kürzeres Mapping
} from "@/constants/foodCategories";

export const MEAL_SLOTS: MealSlot[] = [
  { id: "Breakfast", label: "Frühstück", sortOrder: 1 },
  { id: "MorningSnack", label: "Zwischenmahlzeit Vormittag", sortOrder: 2 },
  { id: "Lunch", label: "Mittagessen", sortOrder: 3 },
  { id: "AfternoonSnack", label: "Zwischenmahlzeit Nachmittag", sortOrder: 4 },
  { id: "Dinner", label: "Abendessen", sortOrder: 5 },
  { id: "EveningSnack", label: "Zwischenmahlzeit Abend", sortOrder: 6 },
];

/* ─────────────── Mock-Entries ─────────────── */
export const mockEntries: MealSlotEntry[] = [
  /* Frühstück ─ Haferbrei */
  {
    date: "2025-06-08",
    mealSlot: "Breakfast",
    entry: {
      id: "f1",
      name: "Haferbrei",
      calories_per_100: 70,
      protein_per_100: 2.4,
      carbohydrates_per_100: 12,
      fat_per_100: 1.4,
      quantity: 250,
      category: "grains", // ✅
    },
  },

  /* Vormittagssnack ─ Apfel */
  {
    date: "2025-06-08",
    mealSlot: "MorningSnack",
    entry: {
      id: "f5",
      name: "Apfel",
      calories_per_100: 52,
      protein_per_100: 0.3,
      carbohydrates_per_100: 14,
      fat_per_100: 0.2,
      quantity: 150,
      category: "fruit", // ✅
    },
  },

  /* Mittag ─ Quinoasalat (Rezept) */
  {
    date: "2025-06-08",
    mealSlot: "Lunch",
    entry: {
      id: "r1",
      name: "Quinoasalat",
      ingredients: [
        {
          id: "f2",
          name: "Quinoa, gekocht",
          calories_per_100: 120,
          protein_per_100: 4.1,
          carbohydrates_per_100: 21.3,
          fat_per_100: 1.9,
          quantity: 150,
          category: "grains",
        },
        {
          id: "f3",
          name: "Tomaten",
          calories_per_100: 18,
          protein_per_100: 0.9,
          carbohydrates_per_100: 3.9,
          fat_per_100: 0.2,
          quantity: 80,
          category: "vegetables",
        },
        {
          id: "f4",
          name: "Avocado",
          calories_per_100: 160,
          protein_per_100: 2,
          carbohydrates_per_100: 8.5,
          fat_per_100: 15,
          quantity: 50,
          category: "fats",
        },
      ],
    },
  },

  /* Nachmittagssnack ─ Mandeln */
  {
    date: "2025-06-08",
    mealSlot: "AfternoonSnack",
    entry: {
      id: "f6",
      name: "Mandeln",
      description: "Handvoll",
      calories_per_100: 575,
      protein_per_100: 21,
      carbohydrates_per_100: 22,
      fat_per_100: 49,
      quantity: 30,
      category: "fats",
    },
  },

  /* Abendessen ─ Gegrilltes Hähnchen mit Gemüse (Rezept) */
  {
    date: "2025-06-08",
    mealSlot: "Dinner",
    entry: {
      id: "r2",
      name: "Gegrilltes Hähnchen mit Gemüse",
      ingredients: [
        {
          id: "f7",
          name: "Hähnchenbrust",
          calories_per_100: 165,
          protein_per_100: 31,
          carbohydrates_per_100: 0,
          fat_per_100: 3.6,
          quantity: 180,
          category: "animal-protein",
        },
        {
          id: "f8",
          name: "Zucchini",
          calories_per_100: 17,
          protein_per_100: 1.2,
          carbohydrates_per_100: 3.1,
          fat_per_100: 0.3,
          quantity: 100,
          category: "vegetables",
        },
        {
          id: "f9",
          name: "Paprika",
          calories_per_100: 31,
          protein_per_100: 1,
          carbohydrates_per_100: 6,
          fat_per_100: 0.3,
          quantity: 80,
          category: "vegetables",
        },
      ],
    },
  },

  /* Abendsnack ─ Quark mit Beeren */
  {
    date: "2025-06-08",
    mealSlot: "EveningSnack",
    entry: {
      id: "f10",
      name: "Magerquark mit Beeren",
      calories_per_100: 75,
      protein_per_100: 12,
      carbohydrates_per_100: 6,
      fat_per_100: 0.3,
      quantity: 200,
      category: "dairy",
    },
  },
];
