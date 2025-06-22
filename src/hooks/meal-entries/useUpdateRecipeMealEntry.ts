import { updateRecipeMealEntry } from "@/api/meal-entries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateRecipeMealEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateRecipeMealEntry"],
    mutationFn: updateRecipeMealEntry,
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
      console.error("Error updating recipe meal entry:", error);
    },
  });
};
