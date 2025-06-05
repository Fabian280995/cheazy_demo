export type MealSlotId =
  | "Breakfast"
  | "MorningSnack"
  | "Lunch"
  | "AfternoonSnack"
  | "Dinner"
  | "EveningSnack";

export const MEAL_SLOTS: {
  id: MealSlotId;
  label: string;
  sortOrder: number;
}[] = [
  { id: "Breakfast", label: "Frühstück", sortOrder: 1 },
  { id: "MorningSnack", label: "Zwischenmahlzeit Vormittag", sortOrder: 2 },
  { id: "Lunch", label: "Mittagessen", sortOrder: 3 },
  { id: "AfternoonSnack", label: "Zwischenmahlzeit Nachmittag", sortOrder: 4 },
  { id: "Dinner", label: "Abendessen", sortOrder: 5 },
  { id: "EveningSnack", label: "Zwischenmahlzeit Abend", sortOrder: 6 },
];
