import { createPersonalGoal } from "@/api/personal-goals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export const useCreatePersonalGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["personalGoals", "create"],
    mutationFn: createPersonalGoal, // → POST row :contentReference[oaicite:1]{index=1}
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["personalGoals"] });
    },
    onError: (error) => {
      console.error("Error creating goal:", error);
    },
  });
};
