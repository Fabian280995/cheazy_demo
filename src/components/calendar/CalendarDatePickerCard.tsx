import { useCalendar } from "@/providers/calendar";
import { useTheme } from "@/providers/theme";
import React from "react";
import Card from "../shared/Card";
import CardHeader from "../shared/CardHeader";
import CardIcon from "../shared/CardIcon";
import DateScrollPicker from "./DateScrollPicker";
import { TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const CalendarDatePickerCard = () => {
  const { categoryColors, colors } = useTheme();
  const { currentDate, increaseMonth, decreaseMonth } = useCalendar();
  return (
    <Card>
      <CardHeader
        title={currentDate.toLocaleDateString("de-DE", {
          month: "long",
          year: "numeric",
        })}
        Icon={() => (
          <CardIcon
            name="calendar"
            bgColor={categoryColors.dairy.background}
            color={`${categoryColors.dairy.foreground}88`}
            gradient
          />
        )}
      >
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            style={{
              width: 32,
              height: 32,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
              backgroundColor: colors.background,
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
              backgroundColor: colors.background,
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
      </CardHeader>

      <DateScrollPicker />
    </Card>
  );
};

export default CalendarDatePickerCard;
