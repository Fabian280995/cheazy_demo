import { signInWithPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner-native";

export const useSignInWithPassword = () => {
  return useMutation({
    mutationKey: ["signIn"],
    mutationFn: signInWithPassword,
    onSuccess: () => {
      toast.success("Erfolgreich angemeldet!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Anmeldung mit E-Mail fehlgeschlagen";
      console.error(message);
      toast.error(
        "Entschuldigung, bei der Anmeldung mit E-Mail ist etwas schief gelaufen. Bitte versuche es später erneut"
      );
    },
  });
};
