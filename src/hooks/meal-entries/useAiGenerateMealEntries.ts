import { aiGenerateMealEntries } from "@/api/ai-meal-entries";
import { useMutation } from "@tanstack/react-query";

export const useAiGenerateMealEntries = () => {
  return useMutation({
    mutationKey: ["aiGenerateMealEntries"],
    mutationFn: aiGenerateMealEntries,
    onSuccess: (data) => {
      console.log("AI meal entry generation successful:", data);
    },
    onError: (error) => {
      console.error("AI meal entry generation failed:", error);
    },
  });
};
