import { useMutation } from "@tanstack/react-query";

export const useTranscription = () => {
  return useMutation({
    mutationKey: ["transcription"],
    mutationFn: () => {
      throw new Error("Transcription not implemented");
    },
    onSuccess: (data) => {
      console.log("Transcription successful:", data);
    },
    onError: (error) => {
      console.error("Transcription failed:", error);
    },
  });
};
