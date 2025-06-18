import { getMealSlotEntriesByDate } from "@/api/meal-entries";
import { useQuery } from "@tanstack/react-query";

export const useMealSlotEntriesQuery = (date: Date) => {
  return useQuery({
    queryKey: ["mealEntries", date],
    queryFn: () => {
      if (!date) {
        throw new Error("Date is required to fetch meal entries");
      }
      return getMealSlotEntriesByDate(date);
    },
  });
};
