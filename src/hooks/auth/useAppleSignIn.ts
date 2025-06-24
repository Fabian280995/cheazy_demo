import { signInWithApple } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner-native";

export const useAppleSignIn = () => {
  return useMutation({
    mutationKey: ["appleSignIn"],
    mutationFn: signInWithApple,
    onSuccess: () => {
      toast.success("Erfolgreich mit Apple angemeldet!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Anmeldung mit Apple war nicht möglich.";
      toast.error(message);
    },
  });
};
