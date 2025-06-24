import { getRecentMealEntries } from "@/api/meal-entries";
import { useAuth } from "@/providers/auth";
import { useQuery } from "@tanstack/react-query";

export const useMealSlotEntriesQuery = () => {
  const { user } = useAuth();
  const limit = 20;

  return useQuery({
    queryKey: ["mealEntries", "recent"],
    queryFn: () => {
      if (!user?.id) {
        throw new Error("User ID is required to fetch meal entries");
      }
      return getRecentMealEntries(user?.id, limit);
    },
  });
};
