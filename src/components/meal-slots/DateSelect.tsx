import { useTheme } from "@/providers/theme";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface DateSelectProps {
  /** Aktuell ausgewähltes Datum */
  date: Date;
  /** Callback, z.B. zum Öffnen eines DatePickers */
  onPress: () => void;
}

export const DateSelect: React.FC<DateSelectProps> = ({ date, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
        height: 64,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Nunito" }}>
        {date.toLocaleDateString("de-DE", { weekday: "long" })}
      </Text>
      <Text style={{ fontSize: 12, color: colors.textLight }}>
        {date.toLocaleDateString("de-DE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </Text>
    </TouchableOpacity>
  );
};
