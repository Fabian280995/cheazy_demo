import { useTheme } from "@/providers/theme";
import React, { PropsWithChildren, ReactNode } from "react";
import { Text, View } from "react-native";

interface Props {
  Icon?: () => ReactNode;
  title: string;
}

const CardHeader = ({ Icon, title, children }: PropsWithChildren<Props>) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {Icon && <Icon />}
        <Text
          style={{
            fontFamily: "Nunito",
            color: colors.text,
            fontWeight: "800",
            fontSize: 16,
          }}
        >
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
};

export default CardHeader;
