import { useMutation } from "@tanstack/react-query";
import { searchFoodIds } from "@/api/foods";
import { toast } from "sonner-native";

export function useSearchFoodIds() {
  return useMutation({
    mutationFn: searchFoodIds,
    onError: (error: any) => {
      console.error("Fehler bei der Suche nach Lebensmitteln:", error);
      toast.error(
        "Entschuldigung, die Suche nach Lebensmitteln ist fehlgeschlagen. Bitte versuche es später erneut."
      );
    },
  });
}
