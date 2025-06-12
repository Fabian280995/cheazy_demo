import { signInWithPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignInWithPassword = () => {
  return useMutation({
    mutationKey: ["signIn"],
    mutationFn: signInWithPassword,
  });
};
