import React from "react";
import { View } from "react-native";
import AppleSignInBtn from "./AppleAuth/AppleSignInBtn";
import GoogleSignInBtn from "./GoogleSignInBtn";

const ExternalAuthBtns = () => {
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 24,
        flexDirection: "row",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <AppleSignInBtn />
      <GoogleSignInBtn />
    </View>
  );
};

export default ExternalAuthBtns;
