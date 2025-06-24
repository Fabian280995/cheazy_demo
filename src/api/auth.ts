import { supabase } from "@/lib/supabase";
import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";
import { jwtDecode } from "jwt-decode";

/* ────────────────────────────────
   Typen
────────────────────────────────── */
type Credentials = { email: string; password: string };

/* ────────────────────────────────
   E-Mail / Passwort
────────────────────────────────── */
export const signUp = async ({ email, password }: Credentials) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

export const signInWithPassword = async ({ email, password }: Credentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true; // für `onSuccess`
};

/* ────────────────────────────────
   Apple
────────────────────────────────── */
export const signInWithApple = async () => {
  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });

  if (!credential.identityToken) {
    throw new Error("Kein identityToken von Apple erhalten");
  }

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "apple",
    token: credential.identityToken,
  });
  if (error) throw error;
  return data;
};

/* ────────────────────────────────
   Google
────────────────────────────────── */
export const signInWithGoogle = async () => {
  // sichert, dass Play Services verfügbar sind (Android)
  await GoogleSignin.hasPlayServices();

  const response = await GoogleSignin.signIn();

  // User-Cancel getrennt behandeln
  if (!isSuccessResponse(response)) {
    throw new Error("GOOGLE_SIGNIN_CANCELLED");
  }

  const { idToken } = response.data;
  if (!idToken) throw new Error("Kein idToken in Google-Antwort");

  // optional: nonce aus dem Token holen
  const decoded: any = jwtDecode(idToken);
  console.debug("Google nonce:", decoded?.nonce);

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: idToken,
  });
  if (error) throw error;
  return data;
};
