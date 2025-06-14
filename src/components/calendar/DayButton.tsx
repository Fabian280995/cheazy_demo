// DayButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "@/providers/theme";

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
      style={[
        s.btn,
        { width },
        isSelected && { backgroundColor: colors.primary },
      ]}
      activeOpacity={0.7}
      onPress={() => onPress(date)}
    >
      <Text style={[s.txt, !isCurrentMonth && s.outside]}>
        {date.getDate()}
      </Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 12,
  },
  txt: { fontSize: 18, fontWeight: "700" },
  outside: { opacity: 0.4 },
});

export default DayButton;
