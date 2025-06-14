// src/components/settings/SettingsItem.tsx
import { useTheme } from "@/providers/theme";
import React, { PropsWithChildren } from "react";
import { ViewStyle } from "react-native";
import Animated, { FadeOut, LinearTransition } from "react-native-reanimated";

interface Props {
  isLast?: boolean;
  isFirst?: boolean;
  style?: ViewStyle;
}

const SettingItemWrapper = ({
  children,
  isLast,
  isFirst,
  style,
}: PropsWithChildren<Props>) => {
  const { colors } = useTheme();
  return (
    <Animated.View
      layout={LinearTransition}
      exiting={FadeOut}
      style={[
        {
          width: "100%",
          height: 48,
          justifyContent: "center",
          backgroundColor: colors.foreground,
          borderBottomLeftRadius: isLast ? 16 : 0,
          borderBottomRightRadius: isLast ? 16 : 0,
          borderTopLeftRadius: isFirst ? 16 : 0,
          borderTopRightRadius: isFirst ? 16 : 0,
          borderBottomColor: colors.background,
          borderBottomWidth: isLast ? 0 : 1,
          overflow: "hidden",
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};
export default SettingItemWrapper;
