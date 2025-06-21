import { deleteRecipeIngredient } from "@/api/recipe-ingredients";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteRecipeIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteRecipeIngredient"],
    mutationFn: deleteRecipeIngredient,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["recipes", data.recipe_id],
      });
      console.log("Recipe ingredient deleted successfully:", data);
    },
    onError: (error) => {
      console.error("Error deleting recipe ingredient:", error);
    },
  });
};
