import { deleteRecipeIngredient } from "@/api/recipe-ingredients";
import { useMutation } from "@tanstack/react-query";

export const useDeleteRecipeIngredient = () => {
  return useMutation({
    mutationKey: ["deleteRecipeIngredient"],
    mutationFn: deleteRecipeIngredient,
    onSuccess: (data) => {
      // Optionally, you can invalidate queries or perform other actions on success
      console.log("Recipe ingredient deleted successfully:", data);
    },
    onError: (error) => {
      console.error("Error deleting recipe ingredient:", error);
    },
  });
};
