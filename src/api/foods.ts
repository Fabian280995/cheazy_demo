import { supabase } from "@/lib/supabase";
import { FoodModel, FoodSearchResponse } from "@/types";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export async function searchFoodIds({
  q,
  max = 50,
}: {
  q: string;
  max?: number;
}) {
  const { data, error } = await supabase.rpc("search_food_ids", {
    q,
    limit_ids: max,
  });
  if (error) throw error;
  return data as FoodSearchResponse[];
}

export async function fetchFoodsByIds(ids: string[]): Promise<FoodModel[]> {
  const { data, error } = await supabase
    .from("foods")
    .select("*")
    .in("id", ids);
  if (error) throw error;

  // Reorder to match `ids` array:
  const rows = data as FoodModel[];
  const map = new Map(rows.map((r) => [r.id, r]));
  return ids.map((id) => map.get(id)!).filter(Boolean);
}

export async function getFoodById(id: string): Promise<FoodModel | null> {
  const { data, error } = await supabase
    .from("foods")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;

  if (!data) throw new Error(`Food with ID ${id} not found`);

  return data;
}
