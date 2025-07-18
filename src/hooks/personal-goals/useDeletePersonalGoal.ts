import { deletePersonalGoal } from "@/api/personal-goals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";

export const useDeletePersonalGoal = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["personalGoals", "delete"],
    mutationFn: deletePersonalGoal,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["personalGoals"] });
      queryClient.removeQueries({ queryKey: ["personalGoals", id] });
      router.dismissTo("/");
    },
    onError: (error) => {
      console.error("Error deleting goal:", error);

      toast.error(
        "Entschuldigung, das Löschen des Ziels ist fehlgeschlagen. Bitte versuche es später erneut."
      );
    },
  });
};
