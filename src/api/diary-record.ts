import { supabase } from "@/lib/supabase";
import { DairyRecordModel } from "@/types";

export async function getDiaryRecordByDate(
  date: Date
): Promise<DairyRecordModel> {
  const formattedDate = date.toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("diary_records")
    .select("*")
    .eq("day", formattedDate)
    .single();

  if (error) throw error;

  if (!data) throw new Error(`Diary record for date ${date} not found`);

  return data;
}
