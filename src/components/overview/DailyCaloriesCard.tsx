import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@/providers/theme";
import { Octicons } from "@expo/vector-icons";

const DailyCaloriesCard = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        padding: 12,
        borderRadius: 16,
        backgroundColor: colors.foreground,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 16,
            backgroundColor: colors.accent,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Octicons name="flame" size={18} color={colors.textForeground} />
        </View>
        <Text
          style={{
            fontFamily: "Nunito",
            color: colors.text,
            fontWeight: "800",
            marginLeft: 8,
            fontSize: 16,
          }}
        >
          Daily Calories
        </Text>
      </View>
    </View>
  );
};

export default DailyCaloriesCard;
