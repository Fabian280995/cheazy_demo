import { supabase } from "@/lib/supabase";
import * as AppleAuthentication from "expo-apple-authentication";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { jwtDecode } from "jwt-decode";

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    throw error;
  }
};

export const signInWithPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw error;
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};

export const signInWithApple = async () => {
  try {
    console.log("Starting Apple Sign-In...");
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (credential.identityToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "apple",
        token: credential.identityToken,
      });

      if (error) {
        console.error("Error signing in with Apple:", error);
      } else {
        console.log("Successfully signed in with Apple:", data);
      }
    } else {
      console.error("No identityToken returned from Apple Sign-In");
    }
  } catch (e: any) {
    if (e.code === "ERR_REQUEST_CANCELED") {
      console.log("User canceled the Apple sign-in flow", e);
    } else {
      console.error("Apple Sign-In Error:", e);
    }
  }
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      const { idToken } = response.data;
      if (!idToken) throw new Error("No idToken found in response");

      const decoded: any = jwtDecode(idToken);
      const nonce = decoded.nonce;
      console.log("nonce", nonce);

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: idToken,
      });
      console.log(data, error);
    } else {
      console.log("Sign-in cancelled by user");
    }
  } catch (err) {
    if (isErrorWithCode(err)) {
      switch (err.code) {
        case statusCodes.IN_PROGRESS:
          console.log("Google sign-in already in progress");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log("Play Services not available or outdated");
          break;
        default:
          console.log("Google Signin Error:", err.message);
      }
    } else {
      console.log("Unexpected error during Google sign-in:", err);
    }
  }
};
