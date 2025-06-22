import { updateRecipe } from "@/api/recipes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateRecipe"],
    mutationFn: updateRecipe,
    onSuccess: (data) => {
      console.log("Recipe updated successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["recipes", data.id] });
    },
    onError: (error) => {
      console.error("Error updating recipe:", error);
    },
  });
};
