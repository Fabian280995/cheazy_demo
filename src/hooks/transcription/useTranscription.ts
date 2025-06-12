import { transcribe } from "@/api/transcription";
import { useMutation } from "@tanstack/react-query";

export const useTranscription = () => {
  return useMutation({
    mutationKey: ["transcription"],
    mutationFn: transcribe,
    onSuccess: (data) => {
      console.log("Transcription successful:", data);
    },
    onError: (error) => {
      console.error("Transcription failed:", error);
    },
  });
};
