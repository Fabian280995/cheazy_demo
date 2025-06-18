import { getMealEntriesByDiaryRecordId } from "@/api/meal-entries";
import { useQuery } from "@tanstack/react-query";

export const useMealEntriesQuery = (diaryRecordId?: string) => {
  return useQuery({
    queryKey: ["mealEntries", diaryRecordId],
    queryFn: () => {
      if (!diaryRecordId) {
        return [];
      }
      return getMealEntriesByDiaryRecordId(diaryRecordId);
    },
    enabled: !!diaryRecordId,
  });
};
