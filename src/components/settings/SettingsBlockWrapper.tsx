import React from "react";
import Animated, { LinearTransition } from "react-native-reanimated";

const SettingsBlockWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Animated.View
      layout={LinearTransition}
      style={{
        paddingBottom: 16,
      }}
    >
      {children}
    </Animated.View>
  );
};

export default SettingsBlockWrapper;
