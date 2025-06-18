import { useTheme } from "@/providers/theme";
import { FoodModel } from "@/types";
import React from "react";
import { Text, View } from "react-native";

const FoodDetailHeader = ({ food }: { food: FoodModel }) => {
  const { colors } = useTheme();
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "800",
            fontSize: 24,
            fontFamily: "Nunito",
            maxWidth: "80%",
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
          adjustsFontSizeToFit
        >
          {food.name}
        </Text>
      </View>
      <View style={{ gap: 4 }}>
        <Text
          style={{
            fontFamily: "Nunito",
            fontSize: 16,
            fontWeight: "500",
            color: colors.textLight,
          }}
        >
          {food.description || "Keine Beschreibung verfügbar."}
        </Text>
      </View>
    </View>
  );
};

export default FoodDetailHeader;
