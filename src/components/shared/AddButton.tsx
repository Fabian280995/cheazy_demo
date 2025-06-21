import { useTheme } from "@/providers/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface AddButtonProps {
  onPress: () => void;
  label: string;
  loading?: boolean;
  disabled?: boolean;
}

export const AddButton: React.FC<AddButtonProps> = ({
  onPress,
  label,
  loading = false,
  disabled = false,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: colors.primary,
        borderRadius: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
      }}
      disabled={loading || disabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.textForeground} />
      ) : (
        <Feather name="plus" size={24} color={colors.textForeground} />
      )}
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
