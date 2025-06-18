import { useCalendar } from "@/providers/calendar";
import { useQuery } from "@tanstack/react-query";

export const useDiaryRecordQuery = () => {
  const { currentDate } = useCalendar();

  return useQuery({
    queryKey: ["diaryRecord", currentDate],
    queryFn: async () => {
      const response = await fetch(`/api/diary-records/${currentDate}`);
      if (!response.ok) {
        return null;
      }
      return response.json();
    },
    enabled: !!currentDate, // Only run the query if currentDate is defined
  });
};
