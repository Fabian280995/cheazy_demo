import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@/providers/theme";
import { useRouter } from "expo-router";

interface Props {
  title?: string;
  onGoBack?: () => void;
  backButtonLabel?: string;
}

const EntryNotFoundScreen = ({ title, onGoBack, backButtonLabel }: Props) => {
  const { colors } = useTheme();
  const router = useRouter();

  const handleBackButtonPress = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      router.back();
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 16,
          textAlign: "center",
        }}
      >
        {title || "Eintrag nicht gefunden."}
      </Text>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginTop: 16,
        }}
      >
        <Text style={{ color: colors.secondary }}>
          {backButtonLabel || "Zurück"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EntryNotFoundScreen;
