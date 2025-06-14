import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@/providers/theme";
import { useCalendar } from "@/providers/calendar";
import { Feather } from "@expo/vector-icons";

interface Props {
  foreground?: boolean;
}

const MonthSwitchHeaderBtns = ({ foreground }: Props) => {
  const { colors } = useTheme();
  const { increaseMonth, decreaseMonth } = useCalendar();
  const bgColor = foreground ? colors.foreground : colors.background;
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <TouchableOpacity
        style={{
          width: 32,
          height: 32,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          backgroundColor: bgColor,
        }}
        onPress={decreaseMonth}
      >
        <Feather
          name="chevron-left"
          size={24}
          color={colors.icon}
          style={{ marginLeft: -2 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 32,
          height: 32,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          backgroundColor: bgColor,
        }}
        onPress={increaseMonth}
      >
        <Feather
          name="chevron-right"
          size={24}
          color={colors.icon}
          style={{ marginLeft: 3 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MonthSwitchHeaderBtns;
