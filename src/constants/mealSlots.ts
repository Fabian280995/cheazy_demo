import { MealSlot, MealSlotEntry } from "@/types";

export const MEAL_SLOTS: MealSlot[] = [
  { id: "Breakfast", label: "Frühstück", sortOrder: 1 },
  { id: "MorningSnack", label: "Zwischenmahlzeit Vormittag", sortOrder: 2 },
  { id: "Lunch", label: "Mittagessen", sortOrder: 3 },
  { id: "AfternoonSnack", label: "Zwischenmahlzeit Nachmittag", sortOrder: 4 },
  { id: "Dinner", label: "Abendessen", sortOrder: 5 },
  { id: "EveningSnack", label: "Zwischenmahlzeit Abend", sortOrder: 6 },
];

// Beispielhafte Definition der Slots mit Sortierreihenfolge
const mealSlots: MealSlot[] = [
  { id: "Breakfast", label: "Frühstück", sortOrder: 1 },
  { id: "MorningSnack", label: "Vormittags-Snack", sortOrder: 2 },
  { id: "Lunch", label: "Mittagessen", sortOrder: 3 },
  { id: "AfternoonSnack", label: "Nachmittags-Snack", sortOrder: 4 },
  { id: "Dinner", label: "Abendessen", sortOrder: 5 },
  { id: "EveningSnack", label: "Abend-Snack", sortOrder: 6 },
];

// Mock-Daten: eine Mischung aus FoodItems und Recipes
export const mockEntries: MealSlotEntry[] = [
  {
    date: "2025-06-08",
    mealSlot: "Breakfast",
    entry: {
      id: "f1",
      name: "Haferbrei",
      calories: 250,
      protein: 8,
      carbohydrates: 45,
      fat: 4,
    },
  },
  {
    date: "2025-06-08",
    mealSlot: "Lunch",
    entry: {
      id: "r1",
      name: "Quinoasalat",
      ingredients: [
        {
          id: "f2",
          name: "Quinoa",
          calories: 120,
          protein: 4,
          carbohydrates: 21,
          fat: 2,
        },
        {
          id: "f3",
          name: "Tomaten",
          calories: 20,
          protein: 1,
          carbohydrates: 4,
          fat: 0.2,
        },
        {
          id: "f4",
          name: "Avocado",
          calories: 160,
          protein: 2,
          carbohydrates: 8,
          fat: 15,
        },
      ],
    },
  },
  {
    date: "2025-06-08",
    mealSlot: "MorningSnack",
    entry: {
      id: "f5",
      name: "Apfel",
      calories: 80,
      protein: 0.5,
      carbohydrates: 19,
      fat: 0.3,
    },
  },
  {
    date: "2025-06-08",
    mealSlot: "AfternoonSnack",
    entry: {
      id: "f6",
      name: "Mandeln",
      description: "Handvoll",
      calories: 170,
      protein: 6,
      carbohydrates: 6,
      fat: 15,
    },
  },
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
          calories: 200,
          protein: 35,
          carbohydrates: 0,
          fat: 5,
        },
        {
          id: "f8",
          name: "Zucchini",
          calories: 25,
          protein: 2,
          carbohydrates: 4,
          fat: 0.5,
        },
        {
          id: "f9",
          name: "Paprika",
          calories: 30,
          protein: 1,
          carbohydrates: 6,
          fat: 0.3,
        },
      ],
    },
  },
  {
    date: "2025-06-08",
    mealSlot: "EveningSnack",
    entry: {
      id: "f10",
      name: "Quark mit Beeren",
      calories: 140,
      protein: 12,
      carbohydrates: 15,
      fat: 2,
    },
  },
];
