import { getRecipeIngredientByRecipeCompId } from "@/api/recipe-ingredients";
import { useQuery } from "@tanstack/react-query";

export const useGetRecipeIngredientByCompId = (
  recipeId: string,
  foodId: string
) => {
  return useQuery({
    queryKey: ["recipe-ingredient", recipeId, foodId],
    queryFn: async () => {
      return getRecipeIngredientByRecipeCompId({
        recipeId: recipeId,
        foodId: foodId,
      });
    },
  });
};
