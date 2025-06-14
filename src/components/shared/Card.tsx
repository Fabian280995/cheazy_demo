// components/DailyCaloriesCard.tsx
import { useTheme } from "@/providers/theme";
import React, { ReactNode } from "react";
import { View } from "react-native";

const Card = ({ children }: { children: ReactNode }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        padding: 12,
        borderRadius: 16,
        backgroundColor: colors.foreground,
      }}
    >
      {children}
    </View>
  );
};

export default Card;
