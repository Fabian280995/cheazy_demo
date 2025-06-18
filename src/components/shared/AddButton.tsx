import { useTheme } from "@/providers/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

interface AddButtonProps {
  onPress: () => void;
  label: string;
  insets: EdgeInsets;
}

export const AddButton: React.FC<AddButtonProps> = ({
  onPress,
  label,
  insets,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "absolute",
        bottom: insets.bottom + 16,
        left: 24,
        right: 24,
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: colors.primary,
        borderRadius: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Feather name="plus" size={24} color={colors.textForeground} />
      <Text
        style={{
          fontFamily: "Inter",
          fontSize: 16,
          fontWeight: "700",
          color: colors.textForeground,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
