import { updateFoodMealEntry } from "@/api/meal-entries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateFoodMealEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateFoodMealEntry"],
    mutationFn: updateFoodMealEntry,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["mealEntries", data.date],
      });
    },
    onError: (error) => {
      console.error("Error updating food meal entry:", error);
    },
  });
};
