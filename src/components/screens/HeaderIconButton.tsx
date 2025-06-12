import { useTheme } from "@/providers/theme";
import { Feather } from "@expo/vector-icons";
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
  iconName?: ComponentProps<typeof Feather>["name"];
  color?: string;
  isLoading?: boolean;
  disabled?: boolean;
  text?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
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
}: Props) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      style={[
        {
          width: text ? undefined : 46,
          height: 46,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.text} />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {iconName && (
            <Feather
              name={iconName}
              size={24}
              color={color ? color : colors.text}
            />
          )}
          {text && (
            <Text
              style={{
                color: color ? color : colors.text,
                marginLeft: 4,
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
