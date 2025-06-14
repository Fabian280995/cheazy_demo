import { useTheme } from "@/providers/theme";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";

interface Props {
  Icon?: () => ReactNode;
  title: string;
}

const CardHeader = ({ Icon, title }: Props) => {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {Icon && <Icon />}
      <Text
        style={{
          fontFamily: "Nunito",
          color: colors.text,
          fontWeight: "800",
          marginLeft: 8,
          fontSize: 16,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default CardHeader;
