import { signInWithGoogle } from "@/api/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGoogleSignIn = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "978915635748-m2hhem5psdrfrc74dp2jfbj9l2gpncco.apps.googleusercontent.com",
      iosClientId:
        "978915635748-km4n25iq12j0elp2hhu3ke24p6rc9upe.apps.googleusercontent.com",
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
  }, []);

  return useMutation({
    mutationKey: ["googleSignIn"],
    mutationFn: signInWithGoogle,
  });
};
