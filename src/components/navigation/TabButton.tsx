// components/TabButton.tsx
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TabTriggerSlotProps } from "expo-router/ui";
import { forwardRef } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

type TabButtonProps = TabTriggerSlotProps & { icon: string };

export const TabButton = forwardRef<View, TabButtonProps>(
  ({ icon, children, isFocused, ...props }, ref) => (
    <Pressable
      {...props}
      ref={ref}
      style={[styles.buttonBase, isFocused && styles.buttonFocused]}
    >
      <FontAwesome name={icon as any} size={24} />
      <Text style={[styles.label, isFocused && styles.labelFocused]}>
        {children}
      </Text>
    </Pressable>
  )
);

const styles = StyleSheet.create({
  buttonBase: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 30,
  },
  buttonFocused: {
    backgroundColor: "#FF6F61",
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: "#888",
  },
  labelFocused: {
    color: "#FFF",
  },
});
