import { supabase } from "@/lib/supabase";
import { PersonalGoal, PersonalGoalForCreate } from "@/types";

export const createPersonalGoal = async (
  goal: PersonalGoalForCreate
): Promise<PersonalGoal> => {
  const { data, error } = await supabase
    .from("personal_goals")
    .insert(goal) // INSERT … VALUES (…) :contentReference[oaicite:6]{index=6}
    .single(); // → einzelnes Objekt statt Array :contentReference[oaicite:7]{index=7}

  if (error) throw error;
  return data;
};

/**
 * Aktives Ziel für ein Datum holen (Standard = heute).
 */
export const getActivePersonalGoal = async (
  date: string = new Date().toISOString().slice(0, 10)
): Promise<PersonalGoal | null> => {
  const { data, error } = await supabase
    .from("personal_goals")
    .select("*")
    .lte("started_at", date) // <= date :contentReference[oaicite:8]{index=8}
    .order("started_at", { ascending: false }) // jüngste zuerst :contentReference[oaicite:9]{index=9}
    .limit(1)
    .single(); // NULL, falls keines vorhanden :contentReference[oaicite:10]{index=10}

  if (error && error.code !== "PGRST116") throw error; // 404 = keine Zeile
  return data ?? null;
};

/**
 * Existierendes Ziel ändern. `updates` darf Teilfelder enthalten.
 */
export const updatePersonalGoal = async (
  id: string,
  updates: Partial<Omit<PersonalGoal, "id" | "started_at">>
): Promise<PersonalGoal> => {
  const { data, error } = await supabase
    .from("personal_goals")
    .update(updates) // UPDATE … SET … :contentReference[oaicite:11]{index=11}
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Ziel löschen (hard-delete).
 */
export const deletePersonalGoal = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("personal_goals")
    .delete() // DELETE :contentReference[oaicite:12]{index=12}
    .eq("id", id);

  if (error) throw error;
};
