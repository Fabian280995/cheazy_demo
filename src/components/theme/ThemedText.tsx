import { useTheme } from "@/providers/theme";
import { readableTextColor } from "@/utils/color";
import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

export interface ThemedTextProps extends TextProps {
  /**
   * Optionaler Hintergrund, um den Text auf kontraststarken Fundament anzupassen.
   */
  bgColor?: string;
}

const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  style,
  bgColor,
  ...rest
}) => {
  const { colors } = useTheme();

  // Textfarbe: bei bgColor kontrastreicher Ton, ansonsten Theme-Text
  const textColor = bgColor
    ? readableTextColor(bgColor, colors.background, colors.text)
    : colors.text;

  // Kombiniere Theme-Farbe mit übergebenem Stil (letzter Eintrag in Array hat Vorrang)
  const combinedStyle: TextStyle = StyleSheet.flatten([
    { color: textColor },
    style,
  ]);

  return (
    <Text style={combinedStyle} {...rest}>
      {children}
    </Text>
  );
};

export default ThemedText;
