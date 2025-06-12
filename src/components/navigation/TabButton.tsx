// components/TabButton.tsx
import { useTheme } from "@/providers/theme";
import { Feather } from "@expo/vector-icons";
import { TabTriggerSlotProps } from "expo-router/ui";
import { ComponentProps, forwardRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type TabButtonProps = TabTriggerSlotProps & {
  icon: ComponentProps<typeof Feather>["name"]; // Icon name from FontAwesome
};

export const TabButton = forwardRef<View, TabButtonProps>(
  ({ icon, children, isFocused, ...props }, ref) => {
    const { colors } = useTheme();
    return (
      <Pressable
        {...props}
        ref={ref}
        style={({ pressed }) => [
          styles.buttonBase,
          {
            borderColor: isFocused ? colors.text : colors.textLight,
            backgroundColor: isFocused ? colors.text : colors.background,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 3,
          },
          pressed && { opacity: 0.7 },
        ]}
      >
        <Feather
          name={icon}
          size={24}
          color={isFocused ? colors.background : colors.textLight}
        />
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  buttonBase: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 30,
    width: 48,
    height: 48,
    borderWidth: 1,
  },
});
