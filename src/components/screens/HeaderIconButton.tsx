import { useTheme } from "@/providers/theme";
import { Octicons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  onPress: () => void;
  onLongPress?: () => void;
  iconName?: ComponentProps<typeof Octicons>["name"];
  color?: string;
  isLoading?: boolean;
  disabled?: boolean;
  text?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  shadow?: boolean;
}

const HeaderIconButton = ({
  onPress,
  onLongPress,
  iconName,
  color,
  isLoading,
  disabled,
  text,
  style,
  children,
  shadow = false,
}: Props) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      style={[
        {
          width: text ? undefined : 36,
          height: 36,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          opacity: disabled ? 0.5 : 1,
          backgroundColor: colors.foreground,
          paddingHorizontal: text ? 8 : 0,
        },
        shadow && {
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 3,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.text} />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {iconName && (
            <Octicons
              name={iconName}
              size={20}
              color={color ? color : colors.text}
            />
          )}
          {text && (
            <Text
              style={{
                color: color ? color : colors.text,
                marginLeft: 4,
                fontFamily: "Nunito",
                fontWeight: "700",
              }}
            >
              {text}
            </Text>
          )}
          {}
        </View>
      )}
      {children}
    </TouchableOpacity>
  );
};

export default HeaderIconButton;
