import { transcribe } from "@/api/transcription";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner-native";

export const useTranscription = () => {
  return useMutation({
    mutationKey: ["transcription"],
    mutationFn: transcribe,
    onSuccess: (data) => {
      console.log("Transcription successful:", data);
    },
    onError: (error) => {
      console.error("Transcription failed:", error);
      toast.error(
        "Entschuldigung, die Transkription ist fehlgeschlagen. Bitte versuche es später erneut."
      );
    },
  });
};
