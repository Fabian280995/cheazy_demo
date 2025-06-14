import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@/providers/theme";
import { useCalendar } from "@/providers/calendar";
import { Feather } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

interface Props {
  foreground?: boolean;
}

const MonthSwitchHeaderBtns = ({ foreground }: Props) => {
  const { colors } = useTheme();
  const { currentDate, increaseMonth, decreaseMonth, updateCurrentDate } =
    useCalendar();
  const bgColor = foreground ? colors.foreground : colors.background;

  const isNotToday = () => {
    const today = new Date();
    return (
      currentDate.getDate() !== today.getDate() ||
      currentDate.getMonth() !== today.getMonth() ||
      currentDate.getFullYear() !== today.getFullYear()
    );
  };

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Animated.View layout={LinearTransition}>
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
      </Animated.View>
      {isNotToday() && (
        <Animated.View
          entering={FadeIn.delay(100)}
          layout={LinearTransition}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
              padding: 8,
            }}
            onPress={() => {
              const today = new Date();
              updateCurrentDate(today);
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: colors.text,
                fontWeight: "600",
              }}
            >
              Heute
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
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
