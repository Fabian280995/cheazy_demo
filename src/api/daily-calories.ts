import { supabase } from "@/lib/supabase";
import { DailyCaloryEntry } from "@/types/nutrition";
import { format } from "date-fns";

export const getDailyCalories = async ({
  start,
  end,
}: {
  start: string;
  end: string;
}): Promise<DailyCaloryEntry[]> => {
  const { data, error } = await supabase.rpc("daily_calories_inline", {
    p_start: start,
    p_end: end,
  });

  if (error) throw error;
  return data;
};
