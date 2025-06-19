import { getAllRecipes } from "@/api/recipes";
import { useAuth } from "@/providers/auth";
import { useQuery } from "@tanstack/react-query";

export const useRecipesQuery = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["recipes", user?.id],
    queryFn: () => {
      if (!user) {
        return [];
      }
      return getAllRecipes(user.id);
    },
  });
};
