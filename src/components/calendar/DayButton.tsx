// DayButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
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
      style={[s.btn, { width }]}
      activeOpacity={0.7}
      onPress={() => onPress(date)}
    >
      <View
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 16,
            paddingHorizontal: 4,
            borderRadius: 16,
          },
          isSelected && { backgroundColor: colors.success },
        ]}
      >
        <Text style={[s.txt, !isCurrentMonth && s.outside]}>
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
