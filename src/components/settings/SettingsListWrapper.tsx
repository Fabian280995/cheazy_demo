import React from "react";
import { View } from "react-native";

const SettingsListWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <View
      style={{
        marginTop: 8,
        marginBottom: 8,
      }}
    >
      {children}
    </View>
  );
};

export default SettingsListWrapper;
