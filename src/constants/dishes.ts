import { Dish, MealSlotId } from "@/types";

export const dishesBySlot: Record<MealSlotId, Dish[]> = {
  Breakfast: [
    {
      id: "dish-uuid-1",
      daily_log_id: "daily-log-uuid-123",
      meal_slot_id: "Breakfast",
      name: "Haferflocken mit Banane",
      notes: "Mit 1 TL Honig",
      timestamp: "2025-06-05T07:45:00Z",
      items: [
        {
          food_item_id: "food-oatmeal",
          quantity: 80,
          unit: "g",
          override_calories: 304, // 80 g Haferflocken @ 380 kcal/100g → rund 304 kcal
          override_protein: 10.4,
          override_carbs: 53.6,
          override_fat: 5.6,
        },
        {
          food_item_id: "food-banana",
          quantity: 1,
          unit: "piece",
          override_calories: 95, // 1 mittelgroße Banane → ca. 95 kcal
          override_protein: 1.2,
          override_carbs: 27,
          override_fat: 0.3,
        },
        {
          food_item_id: "food-honey",
          quantity: 5,
          unit: "g",
          override_calories: 15, // 5 g Honig → ca. 15 kcal
          override_protein: 0,
          override_carbs: 4,
          override_fat: 0,
        },
        {
          food_item_id: "food-milk",
          quantity: 200,
          unit: "ml",
          override_calories: 130, // 200 ml Vollmilch → ca. 130 kcal
          override_protein: 6.6,
          override_carbs: 9.6,
          override_fat: 7.2,
        },
      ],
    },
  ],
  MorningSnack: [
    {
      id: "dish-uuid-2",
      daily_log_id: "daily-log-uuid-123",
      meal_slot_id: "MorningSnack",
      name: "Apfel",
      timestamp: "2025-06-05T10:00:00Z",
      items: [
        {
          food_item_id: "food-apple",
          quantity: 1,
          unit: "piece",
          override_calories: 95,
          override_protein: 0.5,
          override_carbs: 25,
          override_fat: 0.3,
        },
      ],
    },
  ],
  Lunch: [
    {
      id: "dish-uuid-3",
      daily_log_id: "daily-log-uuid-123",
      meal_slot_id: "Lunch",
      name: "Hähnchen-Sandwich mit Salat",
      notes: "Vollkornbrot, wenig Mayo",
      timestamp: "2025-06-05T12:30:00Z",
      items: [
        {
          food_item_id: "food-wholegrain-bread",
          quantity: 2,
          unit: "slice",
          override_calories: 160, // 2 Scheiben Vollkorn (je 80 kcal)
          override_protein: 6,
          override_carbs: 28,
          override_fat: 2,
        },
        {
          food_item_id: "food-chicken-breast",
          quantity: 100,
          unit: "g",
          override_calories: 165,
          override_protein: 31,
          override_carbs: 0,
          override_fat: 3.6,
        },
        {
          food_item_id: "food-lettuce",
          quantity: 50,
          unit: "g",
          override_calories: 7, // 50 g Kopfsalat → ca. 7 kcal
          override_protein: 0.5,
          override_carbs: 1.4,
          override_fat: 0.1,
        },
        {
          food_item_id: "food-tomato",
          quantity: 50,
          unit: "g",
          override_calories: 9, // 50 g Tomate → ca. 9 kcal
          override_protein: 0.5,
          override_carbs: 2,
          override_fat: 0.1,
        },
        {
          food_item_id: "food-mayo",
          quantity: 10,
          unit: "g",
          override_calories: 68, // 10 g Mayonnaise → ca. 68 kcal
          override_protein: 0,
          override_carbs: 0.1,
          override_fat: 7.4,
        },
      ],
    },
    {
      id: "dish-uuid-4",
      daily_log_id: "daily-log-uuid-123",
      meal_slot_id: "Lunch",
      name: "Gemischter Salat",
      notes: "Ohne Dressing",
      timestamp: "2025-06-05T13:00:00Z",
      items: [
        {
          food_item_id: "food-lettuce",
          quantity: 100,
          unit: "g",
          override_calories: 14,
          override_protein: 1,
          override_carbs: 2.8,
          override_fat: 0.2,
        },
        {
          food_item_id: "food-cucumber",
          quantity: 100,
          unit: "g",
          override_calories: 16,
          override_protein: 0.7,
          override_carbs: 3.6,
          override_fat: 0.1,
        },
        {
          food_item_id: "food-carrot",
          quantity: 50,
          unit: "g",
          override_calories: 21,
          override_protein: 0.5,
          override_carbs: 5,
          override_fat: 0.1,
        },
      ],
    },
  ],
  AfternoonSnack: [
    {
      id: "dish-uuid-5",
      daily_log_id: "daily-log-uuid-123",
      meal_slot_id: "AfternoonSnack",
      name: "Handvoll Mandeln",
      timestamp: "2025-06-05T16:00:00Z",
      items: [
        {
          food_item_id: "food-almonds",
          quantity: 30,
          unit: "g",
          override_calories: 174, // 30 g Mandeln → ca. 174 kcal
          override_protein: 6.4,
          override_carbs: 6.1,
          override_fat: 15.2,
        },
      ],
    },
  ],
  Dinner: [
    {
      id: "dish-uuid-6",
      daily_log_id: "daily-log-uuid-123",
      meal_slot_id: "Dinner",
      name: "Gegrillter Lachs mit Brokkoli",
      notes: "Ohne Butter",
      timestamp: "2025-06-05T19:30:00Z",
      items: [
        {
          food_item_id: "food-salmon",
          quantity: 150,
          unit: "g",
          override_calories: 280,
          override_protein: 27,
          override_carbs: 0,
          override_fat: 18,
        },
        {
          food_item_id: "food-broccoli",
          quantity: 100,
          unit: "g",
          override_calories: 34,
          override_protein: 2.8,
          override_carbs: 6.6,
          override_fat: 0.4,
        },
        {
          food_item_id: "food-olive-oil",
          quantity: 10,
          unit: "g",
          override_calories: 88,
          override_protein: 0,
          override_carbs: 0,
          override_fat: 10,
        },
      ],
    },
  ],
  EveningSnack: [
    {
      id: "dish-uuid-7",
      daily_log_id: "daily-log-uuid-123",
      meal_slot_id: "EveningSnack",
      name: "Griechischer Joghurt mit Beeren",
      timestamp: "2025-06-05T21:00:00Z",
      items: [
        {
          food_item_id: "food-greek-yogurt",
          quantity: 150,
          unit: "g",
          override_calories: 146,
          override_protein: 13,
          override_carbs: 6,
          override_fat: 8,
        },
        {
          food_item_id: "food-strawberries",
          quantity: 50,
          unit: "g",
          override_calories: 16,
          override_protein: 0.3,
          override_carbs: 3.8,
          override_fat: 0.2,
        },
        {
          food_item_id: "food-blueberries",
          quantity: 30,
          unit: "g",
          override_calories: 17,
          override_protein: 0.2,
          override_carbs: 4.2,
          override_fat: 0.1,
        },
      ],
    },
  ],
};
