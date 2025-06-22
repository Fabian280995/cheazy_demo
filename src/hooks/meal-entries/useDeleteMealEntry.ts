import { deleteMealEntry } from "@/api/meal-entries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteMealEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteMealEntry"],
    mutationFn: deleteMealEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mealEntries"],
      });
      queryClient.invalidateQueries({
        queryKey: ["daily-calories"],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("Error deleting food meal entry:", error);
    },
  });
};
