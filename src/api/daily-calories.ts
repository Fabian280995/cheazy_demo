import { supabase } from "@/lib/supabase";
import { DailyCaloryEntry } from "@/types/nutrition";
import { format } from "date-fns";

export const getDailyCalories = async ({
  start,
  end,
}: {
  start: Date;
  end: Date;
}): Promise<DailyCaloryEntry[]> => {
  const p_start = format(start, "yyyy-MM-dd");
  const p_end = format(end, "yyyy-MM-dd");

  const { data, error } = await supabase.rpc("daily_calories_inline", {
    p_start,
    p_end,
  });

  if (error) throw error;
  return data;
};
