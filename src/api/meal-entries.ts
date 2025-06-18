import { supabase } from "@/lib/supabase";

export async function getMealEntryById(id: string) {
  const { data, error } = await supabase
    .from("meal_entries")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  if (!data) throw new Error(`Meal entry with ID ${id} not found`);

  return data;
}
