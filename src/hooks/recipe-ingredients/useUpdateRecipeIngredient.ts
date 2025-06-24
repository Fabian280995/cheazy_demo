import { updateRecipeIngredient } from "@/api/recipe-ingredients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner-native";

export const useUpdateRecipeIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRecipeIngredient,
    mutationKey: ["recipe-ingredient", "update"],
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["recipes", data.recipe_id],
      });
    },
    onError: (error) => {
      console.error("Error updating recipe ingredient:", error);
      toast.error(
        "Entschuldigung, das Aktualisieren der Zutat ist fehlgeschlagen. Bitte versuche es später erneut."
      );
    },
  });
};
