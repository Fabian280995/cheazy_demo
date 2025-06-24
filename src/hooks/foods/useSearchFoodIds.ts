import { useMutation } from "@tanstack/react-query";
import { searchFoodIds } from "@/api/foods";
import { toast } from "sonner-native";

export function useSearchFoodIds() {
  return useMutation({
    mutationFn: searchFoodIds,
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Fehler bei der Lebensmittelsuche";
      console.error(message);
      toast.error(message);
    },
  });
}
