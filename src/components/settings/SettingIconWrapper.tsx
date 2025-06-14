import React from "react";
import { View } from "react-native";

const SettingIconWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <View
      style={{
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </View>
  );
};

export default SettingIconWrapper;
