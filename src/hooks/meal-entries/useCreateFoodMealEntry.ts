import { createFoodMealEntry } from "@/api/meal-entries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateFoodMealEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createFoodMealEntry"],
    mutationFn: createFoodMealEntry,
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
      console.error("Error creating food meal entry:", error);
    },
  });
};
