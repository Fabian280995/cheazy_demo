import { getDiaryRecordByDate } from "@/api/diary-record";
import { useCalendar } from "@/providers/calendar";
import { useQuery } from "@tanstack/react-query";

export const useDiaryRecordQuery = () => {
  const { currentDate } = useCalendar();

  return useQuery({
    queryKey: ["diaryRecord", currentDate],
    queryFn: () => getDiaryRecordByDate(currentDate),
    enabled: !!currentDate,
  });
};
