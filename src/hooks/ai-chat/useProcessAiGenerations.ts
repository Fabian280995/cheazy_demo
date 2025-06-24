import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useProcessAiGenerations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["aiGenerations", "process"],
  });
};
