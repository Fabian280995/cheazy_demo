import { useCalendar } from "@/providers/calendar";
import { useTheme } from "@/providers/theme";
import React from "react";
import Card from "../shared/Card";
import CardHeader from "../shared/CardHeader";
import CardIcon from "../shared/CardIcon";
import DateScrollPicker from "./DateScrollPicker";

const CalendarDatePickerCard = () => {
  const { categoryColors } = useTheme();
  const { currentDate } = useCalendar();
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
      />

      <DateScrollPicker />
    </Card>
  );
};

export default CalendarDatePickerCard;
