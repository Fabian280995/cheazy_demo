import { useMutation } from "@tanstack/react-query";

export const useTranscription = () => {
  return useMutation({
    mutationKey: ["transcription"],
    mutationFn: async () => {
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Transcription failed"));
        }, 5000);
      });
    },
    onSuccess: (data) => {
      console.log("Transcription successful:", data);
    },
    onError: (error) => {
      console.error("Transcription failed:", error);
    },
  });
};
