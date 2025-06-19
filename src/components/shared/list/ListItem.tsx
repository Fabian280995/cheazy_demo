import { View, Text } from "react-native";
import React, { PropsWithChildren } from "react";
import { useTheme } from "@/providers/theme";
import Animated, { LinearTransition } from "react-native-reanimated";

interface Props {
  isFirst?: boolean;
  isLast?: boolean;
}

const ListItem = ({
  children,
  isFirst = false,
  isLast = false,
}: PropsWithChildren<Props>) => {
  const { colors } = useTheme();
  return (
    <Animated.View
      layout={LinearTransition}
      style={[
        {
          paddingVertical: 12,
          paddingHorizontal: 12,
          backgroundColor: colors.foreground,
        },
        !isLast
          ? { borderBottomWidth: 1, borderBottomColor: colors.border }
          : {
              borderBottomWidth: 0,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            },
        isFirst ? { borderTopLeftRadius: 16, borderTopRightRadius: 16 } : {},
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default ListItem;
