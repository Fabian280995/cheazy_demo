// Week.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import DayButton from "./DayButton";
import { Week as WeekType } from "@/types";
import { useCalendar } from "@/providers/calendar";

type Props = { week: WeekType; width: number };

const Week: React.FC<Props> = ({ week, width }) => {
  const { currentDate, updateCurrentDate } = useCalendar();
  const cellWidth = width / 7;

  return (
    <View style={[s.row, { width }]}>
      {week.map((d) => (
        <DayButton
          key={d.toISOString()}
          date={d}
          width={cellWidth}
          isCurrentMonth={d.getMonth() === currentDate.getMonth()}
          isSelected={d.toDateString() === currentDate.toDateString()}
          onPress={updateCurrentDate}
        />
      ))}
    </View>
  );
};

const s = StyleSheet.create({ row: { flexDirection: "row" } });
export default Week;
