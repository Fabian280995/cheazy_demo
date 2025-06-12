import { signOut } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignOut = () => {
  return useMutation({
    mutationKey: ["signOut"],
    mutationFn: signOut,
  });
};
