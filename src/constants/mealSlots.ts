import { MealSlot } from "@/types";

export const MEAL_SLOTS: MealSlot[] = [
  { id: "breakfast", label: "Frühstück", sortOrder: 1 },
  { id: "morning_snack", label: "Vormittags Snack", sortOrder: 2 },
  { id: "lunch", label: "Mittagessen", sortOrder: 3 },
  { id: "afternoon_snack", label: "Nachmittags Snack", sortOrder: 4 },
  { id: "dinner", label: "Abendessen", sortOrder: 5 },
  { id: "night_snack", label: "Abend Snack", sortOrder: 6 },
];
