import { useTheme } from "@/providers/theme";
import React from "react";
import { Text, View } from "react-native";

const DetailScreenHeader = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
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
          {title}
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
          {description || "Keine Beschreibung verfügbar."}
        </Text>
      </View>
    </View>
  );
};

export default DetailScreenHeader;
