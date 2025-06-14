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
  /* Frühstück ─ Haferbrei (≈ 175 kcal) */
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
      category: "grains",
    },
  },

  /* Frühstück ─ Peanut-Butter-Toast (≈ 400 kcal) */
  {
    date: "2025-06-08",
    mealSlot: "Breakfast",
    entry: {
      id: "f11",
      name: "Peanut-Butter-Toast",
      calories_per_100: 400,
      protein_per_100: 13,
      carbohydrates_per_100: 36,
      fat_per_100: 24,
      quantity: 100,
      category: "fats",
    },
  },

  /* Vormittagssnack ─ Apfel (≈ 78 kcal) */
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
      category: "fruit",
    },
  },

  /* Mittag ─ Quinoasalat (Recipe, ≈ 275 kcal) */
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

  /* Mittag ─ Burger & Fries (Recipe, ≈ 985 kcal) */
  {
    date: "2025-06-08",
    mealSlot: "Lunch",
    entry: {
      id: "r3",
      name: "Cheeseburger mit Pommes",
      ingredients: [
        {
          id: "f12",
          name: "Burger-Brötchen",
          calories_per_100: 300,
          protein_per_100: 9,
          carbohydrates_per_100: 55,
          fat_per_100: 4,
          quantity: 80,
          category: "grains",
        },
        {
          id: "f13",
          name: "Rindfleisch-Patty",
          calories_per_100: 250,
          protein_per_100: 20,
          carbohydrates_per_100: 0,
          fat_per_100: 18,
          quantity: 120,
          category: "animal-protein",
        },
        {
          id: "f14",
          name: "Cheddar",
          calories_per_100: 403,
          protein_per_100: 25,
          carbohydrates_per_100: 1.3,
          fat_per_100: 33,
          quantity: 30,
          category: "dairy",
        },
        {
          id: "f15",
          name: "Pommes",
          calories_per_100: 312,
          protein_per_100: 3.4,
          carbohydrates_per_100: 41,
          fat_per_100: 15,
          quantity: 150,
          category: "fastfood",
        },
      ],
    },
  },

  /* Nachmittagssnack ─ Mandeln (≈ 173 kcal) */
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

  /* Nachmittagssnack ─ Protein-Shake (≈ 300 kcal) */
  {
    date: "2025-06-08",
    mealSlot: "AfternoonSnack",
    entry: {
      id: "f16",
      name: "Protein-Shake",
      calories_per_100: 120,
      protein_per_100: 20,
      carbohydrates_per_100: 5,
      fat_per_100: 2,
      quantity: 250,
      category: "animal-protein",
    },
  },

  /* Abendessen ─ Hähnchen & Gemüse (Recipe, ≈ 340 kcal) */
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

  /* Dessert ─ Schokoladenkuchen (≈ 450 kcal) */
  {
    date: "2025-06-08",
    mealSlot: "Dinner",
    entry: {
      id: "f17",
      name: "Schokoladenkuchen, Stück",
      calories_per_100: 450,
      protein_per_100: 5,
      carbohydrates_per_100: 50,
      fat_per_100: 25,
      quantity: 100,
      category: "sweets",
    },
  },

  /* Spätabend ─ Vanilleeis (≈ 300 kcal) */
  {
    date: "2025-06-08",
    mealSlot: "EveningSnack",
    entry: {
      id: "f18",
      name: "Vanilleeis",
      calories_per_100: 200,
      protein_per_100: 4,
      carbohydrates_per_100: 24,
      fat_per_100: 10,
      quantity: 150,
      category: "sweets",
    },
  },

  /* Spätabend ─ Pizza-Slice (≈ 400 kcal) */
  {
    date: "2025-06-08",
    mealSlot: "EveningSnack",
    entry: {
      id: "f19",
      name: "Pizza-Slice Salami",
      calories_per_100: 320,
      protein_per_100: 12,
      carbohydrates_per_100: 34,
      fat_per_100: 15,
      quantity: 125,
      category: "fastfood",
    },
  },

  /* Getränk ─ Cola (≈ 150 kcal) */
  {
    date: "2025-06-08",
    mealSlot: "EveningSnack",
    entry: {
      id: "f20",
      name: "Cola",
      calories_per_100: 42,
      protein_per_100: 0,
      carbohydrates_per_100: 10.5,
      fat_per_100: 0,
      quantity: 355,
      category: "drinks-caloric",
    },
  },
];
