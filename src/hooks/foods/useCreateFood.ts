import { createFood } from "@/api/foods";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner-native";

export const useCreateFood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createFood"],
    mutationFn: createFood,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["foods", data.id],
      });
    },
    onError: (error) => {
      console.error("Error creating food:", error);
      toast.error(
        "Entschuldigung, das Erstellen dieses Nahrungsmittels ist fehlgeschlagen. Bitte versuche es später erneut."
      );
    },
  });
};
