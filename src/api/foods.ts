import { supabase } from "@/lib/supabase";

export async function fullTextSearch(q: string) {
  if (q.trim().length < 2) return []; // simple guard
  const { data, error } = await supabase.rpc("search_food", { q });
  if (error) throw error;
  return data; // enthält rank + snippet
}
