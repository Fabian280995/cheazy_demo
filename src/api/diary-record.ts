import { supabase } from "@/lib/supabase";
import { DairyRecordModel } from "@/types";

export async function getDiaryRecordByDate(
  date: string
): Promise<DairyRecordModel> {
  const { data, error } = await supabase
    .from("diary_records")
    .select("*")
    .eq("day", date)
    .single();

  if (error) throw error;

  if (!data) throw new Error(`Diary record for date ${date} not found`);

  return data;
}
