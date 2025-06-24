import { addRecipeIngredientToRecipe } from "@/api/recipe-ingredients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner-native";

export const useCreateRecipeIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addRecipeIngredientToRecipe,
    mutationKey: ["recipe-ingredient", "create"],
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["recipes", data.recipe_id],
      });
    },
    onError: (error) => {
      console.error("Error creating recipe ingredient:", error);
      toast.error(
        "Entschuldigung, das Hinzufügen der Zutat ist fehlgeschlagen. Bitte versuche es später erneut."
      );
    },
  });
};
