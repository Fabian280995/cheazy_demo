import { Tables } from "./supabase";

export type PersonalGoal = Tables<"personal_goals">;
export type PersonalGoalForCreate = Omit<PersonalGoal, "id" | "created_at">;
export type PersonalGoalForUpdate = Partial<PersonalGoal>;

export type NutritionGoal = Pick<
  PersonalGoal,
  "id" | "kcal" | "proteins_g" | "carbs_g" | "fats_g" | "started_at"
>;
