import { getMealEntryById } from "@/api/meal-entries";
import { useQuery } from "@tanstack/react-query";

export const useMealEntryQuery = (id: string) => {
  console.log("useMealEntryQuery called with id:", id);
  return useQuery({
    queryKey: ["mealEntries", id],
    queryFn: () => getMealEntryById(id),
    enabled: !!id,
  });
};
