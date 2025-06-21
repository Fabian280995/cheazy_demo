import { createRecipeMealEntry } from "@/api/meal-entries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateRecipeMealEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createRecipeMealEntry"],
    mutationFn: createRecipeMealEntry,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["mealEntries", new Date(data.date)],
      });
    },
    onError: (error) => {
      console.error("Error creating recipe meal entry:", error);
    },
  });
};
