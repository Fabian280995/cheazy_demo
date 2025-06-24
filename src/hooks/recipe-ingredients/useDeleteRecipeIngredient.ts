import { deleteRecipeIngredient } from "@/api/recipe-ingredients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner-native";

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
      toast.error(
        "Entschuldigung, das Löschen der Zutat ist fehlgeschlagen. Bitte versuche es später erneut."
      );
    },
  });
};
