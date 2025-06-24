import { signOut } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner-native";

export const useSignOut = () => {
  return useMutation({
    mutationKey: ["signOut"],
    mutationFn: signOut,
    onSuccess: () => {
      toast.success("Erfolgreich abgemeldet!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Abmeldung fehlgeschlagen";
      toast.error(message);
    },
  });
};
