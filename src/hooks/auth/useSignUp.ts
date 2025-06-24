import { signUp } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner-native";

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: signUp,
    onSuccess: () => {
      toast.success(
        "Erfolgreich registriert! Wir haben die eine E-Mail geschickt, um dein Konto zu verifizieren."
      );
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Registrierung fehlgeschlagen";
      toast.error(message);
    },
  });
};
