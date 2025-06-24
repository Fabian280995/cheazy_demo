import { updateRecipe } from "@/api/recipes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner-native";

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateRecipe"],
    mutationFn: updateRecipe,
    onSuccess: (data) => {
      console.log("Recipe updated successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["recipes", data.id] });
    },
    onError: (error) => {
      console.error("Error updating recipe:", error);
      toast.error(
        "Entschuldigung, das Aktualisieren des Rezepts ist fehlgeschlagen. Bitte versuche es später erneut."
      );
    },
  });
};
