import { supabase } from "@/lib/supabase";
import { FoodModel, FoodSearchResponse } from "@/types";

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
  return data;
}
