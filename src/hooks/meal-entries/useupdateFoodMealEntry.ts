import { updateFoodMealEntry } from "@/api/meal-entries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateFoodMealEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateFoodMealEntry"],
    mutationFn: updateFoodMealEntry,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["mealEntries", new Date(data.date)],
      });
      queryClient.invalidateQueries({
        queryKey: ["daily-calories"],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("Error updating food meal entry:", error);
    },
  });
};
