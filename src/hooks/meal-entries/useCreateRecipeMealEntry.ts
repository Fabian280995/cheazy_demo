import { createRecipeMealEntry } from "@/api/meal-entries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner-native";

export const useCreateRecipeMealEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createRecipeMealEntry"],
    mutationFn: createRecipeMealEntry,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["mealEntries", new Date(data.date)],
      });
      queryClient.invalidateQueries({
        queryKey: ["daily-calories"],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("Error creating recipe meal entry:", error);
      toast.error(
        "Entschuldigung, das Erstellen der Mahlzeit ist fehlgeschlagen. Bitte versuche es später erneut."
      );
    },
  });
};
