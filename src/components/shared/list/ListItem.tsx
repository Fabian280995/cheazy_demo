import { useTheme } from "@/providers/theme";
import React, { PropsWithChildren } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

interface BaseProps {
  isFirst?: boolean;
  isLast?: boolean;
  style?: ViewStyle;
}

export const ListItem = ({
  children,
  isFirst = false,
  isLast = false,
  style,
}: PropsWithChildren<BaseProps>) => {
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
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

interface PressableListItemProps extends BaseProps {
  onPress: () => void;
}

export const PressableListItem: React.FC<
  PropsWithChildren<PressableListItemProps>
> = ({ children, onPress, isFirst, isLast, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ListItem isFirst={isFirst} isLast={isLast} style={style}>
        {children}
      </ListItem>
    </TouchableOpacity>
  );
};
