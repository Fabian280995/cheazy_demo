import { useTheme } from "@/providers/theme";
import { readableTextColor } from "@/utils/color";
import { Feather } from "@expo/vector-icons";
import React from "react";

export interface ThemedFeatherProps
  extends React.ComponentProps<typeof Feather> {
  /**
   * Optionaler Hintergrund, um den Icon innerhalb eines farbigen Bereichs hervorzuheben.
   */
  bgColor?: string;
}

const ThemedFeather: React.FC<ThemedFeatherProps> = ({
  name,
  size = 24,
  bgColor,
  color,
  style,
  ...rest
}) => {
  const { colors } = useTheme();
  // Icon-Farbe: falls color-Prop gesetzt wird es direkt verwendet, sonst kontrastierend zum bgColor oder Theme-Text
  const iconColor = color
    ? color
    : bgColor
    ? readableTextColor(bgColor, colors.background, colors.text)
    : colors.text;

  return (
    <Feather
      name={name}
      size={size}
      color={iconColor}
      style={style}
      {...rest}
    />
  );
};

export default ThemedFeather;
