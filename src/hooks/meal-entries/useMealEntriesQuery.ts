import { useQuery } from "@tanstack/react-query";

export const useMealEntriesQuery = () => {
  return useQuery({
    queryKey: ["mealEntries"],
    queryFn: async () => {
      const response = await fetch("/api/meal-entries");
      if (!response.ok) {
        throw new Error("Failed to fetch meal entries");
      }
      return response.json();
    },
  });
};
