import { useAppleSignIn } from "@/hooks/auth/useAppleSignIn";
import React from "react";
import { Platform } from "react-native";
import OAuthBtn from "../OAuthBtn";

const AppleSignInBtn: React.FC = () => {
  const { mutateAsync: signInWithApple } = useAppleSignIn();
  if (Platform.OS !== "ios") {
    return null;
  }

  return <OAuthBtn onPress={signInWithApple} iconName="apple" />;
};

export default AppleSignInBtn;
