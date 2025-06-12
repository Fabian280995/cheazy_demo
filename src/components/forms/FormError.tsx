import { useTheme } from "@/providers/theme";
import React, { memo } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

interface FormErrorProps {
  /** Fehlermeldung, die angezeigt wird */
  message: string;
  /** Zusätzliche Style-Overrides für das Text-Element */
  style?: StyleProp<TextStyle>;
}

/**
 * FormError-Komponente zeigt Validierungsfehler unter Formularfeldern an.
 * Nutzt das aktuelle Theme, um die destruktive Farbe zu ziehen.
 */
const FormError: React.FC<FormErrorProps> = memo(({ message, style }) => {
  const { colors } = useTheme();

  return (
    <Text
      accessibilityRole="alert"
      style={[styles.errorText, { color: colors.destructive }, style]}
    >
      {message}
    </Text>
  );
});

const styles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default FormError;
