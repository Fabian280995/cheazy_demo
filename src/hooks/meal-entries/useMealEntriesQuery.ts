import { getMealEntriesByDiaryRecordId } from "@/api/meal-entries";
import { useQuery } from "@tanstack/react-query";

export const useMealEntriesQuery = (diaryRecordId: string) => {
  return useQuery({
    queryKey: ["mealEntries", diaryRecordId],
    queryFn: () => getMealEntriesByDiaryRecordId(diaryRecordId),
    enabled: !!diaryRecordId,
  });
};
