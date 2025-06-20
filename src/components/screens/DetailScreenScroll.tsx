import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/providers/theme";

const DetailScreenScroll = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.foreground,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: insets.bottom + 16,
        height: (height / 3) * 2,
      }}
    >
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 24,
          gap: 24,
        }}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default DetailScreenScroll;
