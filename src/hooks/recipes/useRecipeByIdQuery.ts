import { getRecipeById } from "@/api/recipes";
import { useAuth } from "@/providers/auth";
import { useQuery } from "@tanstack/react-query";

export const useRecipeByIdQuery = (id: string) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["recipes", id],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");
      return getRecipeById(user.id, id);
    },
    enabled: !!id && !!user,
  });
};
