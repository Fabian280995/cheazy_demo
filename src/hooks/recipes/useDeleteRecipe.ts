import { deleteRecipe } from "@/api/recipes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["deleteRecipe"],
    mutationFn: deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
    onError: (error) => {
      console.error("Error deleting recipe:", error);
      toast.error(
        "Entschuldigung, das Löschen des Rezepts ist fehlgeschlagen. Bitte versuche es später erneut."
      );
      router.dismissTo("/recipes");
    },
  });
};
