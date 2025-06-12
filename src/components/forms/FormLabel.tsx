import { useTheme } from "@/providers/theme";
import React, { memo } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

interface FormLabelProps {
  /** Der Text, der als Label angezeigt wird */
  label: string;
  /** Zusätzliche Style-Overrides für das Text-Element */
  style?: StyleProp<TextStyle>;
}

/**
 * FormLabel-Komponente zeigt eine Beschriftung über Formularfeldern an.
 * Nutzt das zentrale Theme für die Farbe und erlaubt Style-Overrides.
 */
const FormLabel: React.FC<FormLabelProps> = memo(({ label, style }) => {
  const { colors } = useTheme();

  return (
    <Text
      accessibilityRole="header"
      style={[
        styles.label,
        { color: colors.textLight, textTransform: "uppercase" },
        style,
      ]}
    >
      {label}
    </Text>
  );
});

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
    marginLeft: 12,
  },
});

export default FormLabel;
