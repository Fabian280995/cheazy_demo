import { addRecipeIngredientToRecipe } from "@/api/recipe-ingredients";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    },
  });
};
