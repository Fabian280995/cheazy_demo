import { MealSlotEntry } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useProcessAiGenerations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["aiGenerations", "process"],
    mutationFn: async (data: MealSlotEntry[]) => {
      console.log("Processing AI generations:", data);

      if (!data || data.length === 0) {
        throw new Error("No meal entries to process");
      }

      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mealEntries"],
      });
      queryClient.invalidateQueries({
        queryKey: ["daily-calories"],
        exact: false,
      });
    },
  });
};
