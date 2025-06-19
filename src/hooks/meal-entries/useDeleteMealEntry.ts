import { deleteMealEntry } from "@/api/meal-entries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteMealEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteMealEntry"],
    mutationFn: deleteMealEntry,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["mealEntries"],
      });
    },
    onError: (error) => {
      console.error("Error deleting food meal entry:", error);
    },
  });
};
