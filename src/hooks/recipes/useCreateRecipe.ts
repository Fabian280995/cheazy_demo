import { createRecipe } from "@/api/recipes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["createRecipe"],
    mutationFn: createRecipe,
    onSuccess: (data) => {
      console.log("Recipe created successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      router.push(`/recipes/${data.id}`);
    },
    onError: (error) => {
      console.error("Error creating recipe:", error);
      router.dismissTo("/recipes");
    },
  });
};
