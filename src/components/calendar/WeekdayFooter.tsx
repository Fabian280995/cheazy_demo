// WeekdayFooter.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/providers/theme";
const labels = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const WeekdayFooter: React.FC<{ cellWidth: number }> = ({ cellWidth }) => {
  const { colors } = useTheme();
  return (
    <View style={s.row} pointerEvents="none">
      {labels.map((l) => (
        <View key={l} style={{ width: cellWidth, alignItems: "center" }}>
          <Text style={[s.lbl, { color: colors.textLight }]}>{l}</Text>
        </View>
      ))}
    </View>
  );
};
const s = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between" },
  lbl: {
    fontFamily: "Nunito",
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
export default WeekdayFooter;
