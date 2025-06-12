import { Feather } from "@expo/vector-icons";
import React, { memo, useCallback } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";

import { useTheme } from "@/providers/theme";
import { readableTextColor } from "@/utils/color";
import FormAnimationWrapper from "./FormAnimationWrapper";
import ThemedFeather from "../theme/ThemedFeather";
import ThemedText from "../theme/ThemedText";
import {
  FORM_ITEM_BORDER_RADIUS,
  FORM_ITEM_HEIGHT,
  FORM_ITEM_TEXT_SIZE,
} from "@/constants/forms";

interface FormButtonProps {
  /** Text, der auf dem Button angezeigt wird */
  title?: string;
  /** Zeigt einen Lade-Indikator statt des Inhalts */
  isLoading?: boolean;
  /** Callback, wenn der Button gedrückt wird */
  onPress: () => void;
  /** Name des Icons aus Feather */
  iconName?: React.ComponentProps<typeof Feather>["name"];
  /** Schaltet den Button inaktiv */
  disabled?: boolean;
  /** Invertiert Vorder- und Hintergrundfarben */
  invertColors?: boolean;
  /** Gibt an, ob nur das Icon angezeigt wird */
  isIconOnly?: boolean;
  /** Zusätzliche Style-Overrides für das Button-Container */
  style?: StyleProp<ViewStyle>;
  tintColor?: string;
  iconEnd?: boolean;
  textStyle?: StyleProp<TextStyle>;
  noBgColor?: boolean;
}

const FormButton: React.FC<FormButtonProps> = memo(
  ({
    title,
    isLoading = false,
    onPress,
    iconName,
    disabled = false,
    invertColors = false,
    isIconOnly = false,
    style,
    tintColor,
    iconEnd = false,
    textStyle,
    noBgColor = false,
  }) => {
    const { colors } = useTheme();
    const primaryColor = tintColor || colors.foreground;
    const bgColor = invertColors ? primaryColor : colors.primary;
    const contentColor = invertColors
      ? readableTextColor(bgColor, colors.background, colors.text)
      : primaryColor;

    const handlePress = useCallback(() => {
      if (!disabled && !isLoading) {
        onPress();
      }
    }, [disabled, isLoading, onPress]);

    const ButtonIcon = () => {
      if (!iconName) return null;
      return <ThemedFeather name={iconName} size={20} bgColor={bgColor} />;
    };

    const ButtonText = () => {
      if (!title) return null;
      return (
        <ThemedText
          bgColor={bgColor}
          style={[{ fontSize: FORM_ITEM_TEXT_SIZE }, textStyle]}
        >
          {title}
        </ThemedText>
      );
    };

    return (
      <FormAnimationWrapper>
        <Pressable
          onPress={handlePress}
          disabled={disabled || isLoading}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: noBgColor ? "transparent" : bgColor,
              opacity: pressed || disabled ? 0.5 : 1,
            },
            style,
          ]}
          accessibilityRole="button"
          accessibilityState={{ disabled: disabled || isLoading }}
        >
          {isLoading ? (
            <Animated.View entering={BounceIn.delay(200)} exiting={BounceOut}>
              <ActivityIndicator size="small" color={contentColor} />
            </Animated.View>
          ) : (
            <Animated.View
              entering={BounceIn.delay(200)}
              exiting={BounceOut}
              style={styles.content}
            >
              {!iconEnd && <ButtonIcon />}
              {!isIconOnly && <ButtonText />}
              {iconEnd && <ButtonIcon />}
            </Animated.View>
          )}
        </Pressable>
      </FormAnimationWrapper>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    height: FORM_ITEM_HEIGHT,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: FORM_ITEM_BORDER_RADIUS,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});

export default FormButton;
