import { aiGenerateMealEntries } from "@/api/ai-meal-entries";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner-native";

export const useAiGenerateMealEntries = () => {
  return useMutation({
    mutationKey: ["aiGenerateMealEntries"],
    mutationFn: aiGenerateMealEntries,
    onSuccess: (data) => {
      console.log("AI meal entry generation successful:", data);
    },
    onError: (error) => {
      console.error("Fehler bei der Suche nach Lebensmitteln:", error);
      toast.error(
        "Entschuldigung, das Erstellen von Mahlzeiten ist fehlgeschlagen. Bitte versuche es später erneut."
      );
    },
  });
};
