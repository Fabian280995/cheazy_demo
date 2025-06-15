import { supabase } from "@/lib/supabase";

export type FoodSearchResponseItem = {
  id: string;
  name: string;
  rank: number;
  snippet: string | null;
};

export async function fullTextSearch(
  query: string,
  page = 0,
  pageSize = 25
): Promise<FoodSearchResponseItem[]> {
  const { data, error } = await supabase.rpc("search_food_paginated", {
    q: query,
    p_offset: page * pageSize,
    p_limit: pageSize,
  });

  if (error) throw error;
  return data as FoodSearchResponseItem[];
}
