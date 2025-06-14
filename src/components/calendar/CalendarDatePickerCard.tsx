import { useCalendar } from "@/providers/calendar";
import { useTheme } from "@/providers/theme";
import React from "react";
import Card from "../shared/Card";
import CardHeader from "../shared/CardHeader";
import CardIcon from "../shared/CardIcon";
import DateScrollPicker from "./DateScrollPicker";
import MonthSwitchHeaderBtns from "./MonthSwitchHeaderBtns";

interface Props {
  small?: boolean;
}

const CalendarDatePickerCard = ({ small = false }: Props) => {
  const { categoryColors } = useTheme();
  const { currentDate, increaseMonth, decreaseMonth } = useCalendar();
  return (
    <Card>
      <CardHeader
        title={currentDate.toLocaleDateString("de-DE", {
          month: "long",
          year: "numeric",
        })}
        Icon={() =>
          !small && (
            <CardIcon
              name="calendar"
              bgColor={categoryColors.dairy.background}
              color={`${categoryColors.dairy.foreground}88`}
              gradient
            />
          )
        }
      >
        <MonthSwitchHeaderBtns />
      </CardHeader>

      <DateScrollPicker small={small} />
    </Card>
  );
};

export default CalendarDatePickerCard;
