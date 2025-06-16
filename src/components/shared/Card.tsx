// components/DailyCaloriesCard.tsx
import { useTheme } from "@/providers/theme";
import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";

const Card = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: ViewStyle;
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          padding: 12,
          borderRadius: 16,
          backgroundColor: colors.foreground,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Card;
