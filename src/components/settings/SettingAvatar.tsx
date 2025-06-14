// src/components/shared/forms/SettingAvatar.tsx

import { useTheme } from "@/providers/theme";
import { readableTextColor } from "@/utils/color";
import React, { ReactNode } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import SettingIconWrapper from "./SettingIconWrapper";

interface Props {
  avatarUrl: string | null;
  size?: number;
  noImageColor: string;
  noImageLabel?: string;
  noImageIcon?: ReactNode;
}

export const SettingAvatar = ({
  avatarUrl,
  size = 36,
  noImageColor,
  noImageLabel,
  noImageIcon,
}: Props) => {
  const { colors, dark } = useTheme();
  const avatarSize = { width: size, height: size };
  const textColor = !dark
    ? noImageColor
      ? readableTextColor(noImageColor, colors.background, colors.text)
      : colors.text
    : colors.background;

  return (
    <SettingIconWrapper>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View
          style={[avatarSize, styles.avatar, { backgroundColor: noImageColor }]}
        >
          {noImageIcon ? (
            <View
              style={{
                width: size,
                height: size,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {noImageIcon}
            </View>
          ) : noImageLabel ? (
            // Ansonsten – falls ein Label da ist – das Label
            <Text
              style={{
                color: textColor,
                fontSize: size / 2,
                textAlign: "center",
                lineHeight: size,
                fontWeight: "bold",
              }}
            >
              {noImageLabel}
            </Text>
          ) : null}
        </View>
      )}
    </SettingIconWrapper>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    overflow: "hidden",
    maxWidth: "100%",
  },
  image: {
    objectFit: "cover",
    paddingTop: 0,
  },
});
