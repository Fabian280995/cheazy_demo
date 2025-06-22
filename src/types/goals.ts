import { Tables } from "./supabase";

export type PersonalGoal = Tables<"personal_goals">;
export type PersonalGoalForCreate = Omit<PersonalGoal, "id" | "created_at">;
export type PersonalGoalForUpdate = Partial<PersonalGoal>;
