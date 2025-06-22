import { supabase } from "@/lib/supabase";
import {
  PersonalGoal,
  PersonalGoalForCreate,
  PersonalGoalForUpdate,
} from "@/types";

export const getPersonalGoals = async (): Promise<PersonalGoal[]> => {
  const { data, error } = await supabase
    .from("personal_goals")
    .select("*")
    .order("started_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const createPersonalGoal = async (
  goal: PersonalGoalForCreate
): Promise<PersonalGoal> => {
  const { data, error } = await supabase
    .from("personal_goals")
    .insert(goal)
    .single();

  if (error) throw error;
  return data;
};

export const getActivePersonalGoal = async (
  date: string
): Promise<PersonalGoal | null> => {
  const { data, error } = await supabase
    .from("personal_goals")
    .select("*")
    .lte("started_at", date)
    .order("started_at", { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data ?? null;
};

export const updatePersonalGoal = async ({
  id,
  updates,
}: {
  id: string;
  updates: PersonalGoalForUpdate;
}): Promise<PersonalGoal> => {
  const { data, error } = await supabase
    .from("personal_goals")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deletePersonalGoal = async (id: string): Promise<void> => {
  const { error } = await supabase.from("personal_goals").delete().eq("id", id);

  if (error) throw error;
};
