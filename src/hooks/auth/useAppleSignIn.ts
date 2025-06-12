import { signInWithApple } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useAppleSignIn = () => {
  return useMutation({
    mutationKey: ["appleSignIn"],
    mutationFn: signInWithApple,
  });
};
