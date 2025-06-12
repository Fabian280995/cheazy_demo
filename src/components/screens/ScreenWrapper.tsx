import { useTheme } from "@/providers/theme";
import React, { PropsWithChildren } from "react";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

interface Props {
  withHeader?: boolean;
  mode?: "light" | "gray";
  noColor?: boolean;
  style?: SafeAreaViewProps["style"];
}
const ScreenWrapper = ({
  children,
  withHeader,
  mode,
  noColor,
  style,
}: PropsWithChildren<Props>) => {
  const { colors } = useTheme();
  // when noColor bg should be transparent, on light ist should be colors.background and on gray it should be colors.foreground
  const backgroundColor =
    noColor || mode === "light"
      ? "transparent"
      : mode === "gray"
      ? colors.foreground
      : colors.background;

  return (
    <SafeAreaView
      edges={withHeader ? ["bottom", "left", "right"] : undefined}
      style={[{ flex: 1, backgroundColor }, style]}
    >
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;
