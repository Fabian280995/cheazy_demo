import { useGoogleSignIn } from "@/hooks/auth/useGoogleSignIn";
import React from "react";
import OAuthBtn from "./OAuthBtn";

const GoogleSignInBtn = () => {
  const { mutateAsync: signInWithGoogle } = useGoogleSignIn();

  return <OAuthBtn onPress={signInWithGoogle} iconName="google" />;
};

export default GoogleSignInBtn;
