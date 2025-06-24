import { MealSlotEntry } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useProcessAiGenerations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["aiGenerations", "process"],
    mutationFn: async (data: MealSlotEntry[]) => {
      return;
    },
  });
};
