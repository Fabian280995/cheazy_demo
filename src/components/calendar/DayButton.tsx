// DayButton.tsx
import { useTheme } from "@/providers/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  date: Date;
  width: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  onPress: (d: Date) => void;
};

const DayButton: React.FC<Props> = ({
  date,
  width,
  isCurrentMonth,
  isSelected,
  onPress,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[s.btn, { width }]}
      activeOpacity={0.7}
      onPress={() => onPress(date)}
    >
      <View
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            width: 42,
            height: 42,
            borderRadius: 16,
            backgroundColor: isSelected ? colors.primary : colors.background,
          },
        ]}
      >
        <Text
          style={[
            s.txt,
            !isCurrentMonth && s.outside,
            isSelected && { color: colors.textForeground },
          ]}
        >
          {date.getDate()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
  },
  txt: { fontSize: 18, fontWeight: "700" },
  outside: { opacity: 0.4 },
});

export default DayButton;
