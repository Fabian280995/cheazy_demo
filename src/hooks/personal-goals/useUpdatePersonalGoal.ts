import { updatePersonalGoal } from "@/api/personal-goals";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdatePersonalGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["personalGoals", "update"],
    mutationFn: updatePersonalGoal,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["personalGoals", id] });
      queryClient.invalidateQueries({ queryKey: ["personalGoals"] });
    },
    onError: (error) => console.error("Error updating goal:", error),
  });
};
