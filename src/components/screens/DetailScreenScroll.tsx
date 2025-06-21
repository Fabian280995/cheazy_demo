import { useTheme } from "@/providers/theme";
import React from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
        height: (height / 4) * 3,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 24,
          paddingBottom: height / 3,
          gap: 24,
        }}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default DetailScreenScroll;
