import { updateFoodMealEntry } from "@/api/meal-entries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner-native";

export const useUpdateFoodMealEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateFoodMealEntry"],
    mutationFn: updateFoodMealEntry,
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
      console.error("Error updating food meal entry:", error);
      toast.error(
        "Entschuldigung, das Aktualisieren der Mahlzeit ist fehlgeschlagen. Bitte versuche es später erneut."
      );
    },
  });
};
