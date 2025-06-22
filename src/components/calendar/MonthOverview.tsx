import {
  addDays,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfWeek,
} from "date-fns";
import { de } from "date-fns/locale";
import React, { useCallback, useMemo, useRef } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { useDailyCalories } from "@/hooks/nutrition/useDailyCalories";
import { useCalendar } from "@/providers/calendar";
import { useTheme } from "@/providers/theme";

import DayNutriIndicator from "./DayNutriIndicator";
import MonthSwitchHeaderBtns from "./MonthSwitchHeaderBtns";

const DAY_GAP = 12;
const WEEK_GAP = 24;
const SCROLL_HORIZONTAL_PADDING = 8;
const TARGET_CAL = 3200;

function buildWeeks(year: number, month: number): Date[][] {
  const firstOfMonth = new Date(year, month, 1);
  const calendarStart = startOfWeek(firstOfMonth, { weekStartsOn: 1 });
  const lastOfMonth = endOfMonth(firstOfMonth);

  const weeks: Date[][] = [];
  let cursor = calendarStart;

  while (cursor <= lastOfMonth || weeks[weeks.length - 1]?.length !== 7) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(cursor);
      cursor = addDays(cursor, 1);
    }
    weeks.push(week);
  }
  return weeks;
}

interface DayCellProps {
  day: Date;
  width: number;
  inMonth: boolean;
  isCurrentDay: boolean;
  kcal: number | undefined;
  onPress: () => void;
}

const DayCell: React.FC<DayCellProps> = ({
  day,
  width,
  inMonth,
  isCurrentDay,
  kcal,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ alignItems: "center", width, opacity: inMonth ? 1 : 0.3 }}
    >
      <DayNutriIndicator
        size={width * 0.9}
        value={kcal ?? 0}
        ringShown={inMonth}
        target={TARGET_CAL}
        date={day.getDate()}
        isCurrentDay={isCurrentDay}
        isToday={isToday(day)}
      />
    </TouchableOpacity>
  );
};

interface WeekRowProps {
  week: Date[];
  weekIdx: number;
  dayWidth: number;
  onDayPress: (date: Date, weekIdx: number) => void;
}

const WeekRow: React.FC<WeekRowProps> = ({
  week,
  weekIdx,
  dayWidth,
  onDayPress,
}) => {
  const { currentDate } = useCalendar();

  const { data: weekCalories } = useDailyCalories({
    start: week[0],
    end: week[6],
  });

  const kcalMap = useMemo(() => {
    const map: Record<string, number | undefined> = {};
    weekCalories?.forEach((row) => {
      map[row.day] = row.kcal;
    });
    return map;
  }, [weekCalories]);

  return (
    <View
      style={{
        flexDirection: "row",
        gap: DAY_GAP,
        width: dayWidth * 7 + DAY_GAP * 6,
      }}
    >
      {week.map((day, dayIdx) => {
        const key = format(day, "yyyy-MM-dd");
        const kcal = kcalMap[key];
        const inMonth = isSameMonth(day, currentDate);
        const isCurrentDay = isSameDay(day, currentDate);

        return (
          <DayCell
            key={dayIdx}
            day={day}
            width={dayWidth}
            inMonth={inMonth}
            isCurrentDay={isCurrentDay}
            kcal={kcal}
            onPress={() => onDayPress(day, weekIdx)}
          />
        );
      })}
    </View>
  );
};

const MonthOverview: React.FC = () => {
  const { width: screenWidth } = useWindowDimensions();
  const { colors } = useTheme();
  const { currentDate, updateCurrentDate } = useCalendar();
  const scrollRef = useRef<FlatList<Date[]>>(null);

  const dayWidth = useMemo(
    () => (screenWidth - SCROLL_HORIZONTAL_PADDING * 2 - DAY_GAP * 6) / 7,
    [screenWidth]
  );
  const weekWidth = useMemo(() => dayWidth * 7 + DAY_GAP * 6, [dayWidth]);

  const weeks = useMemo(
    () => buildWeeks(currentDate.getFullYear(), currentDate.getMonth()),
    [currentDate]
  );

  const currentWeekIndex = useMemo(
    () => weeks.findIndex((w) => w.some((d) => isSameDay(d, currentDate))),
    [weeks, currentDate]
  );

  const visibleWeek = weeks[currentWeekIndex] ?? weeks[0];

  React.useEffect(() => {
    if (currentWeekIndex !== -1) {
      scrollRef.current?.scrollToIndex({
        index: currentWeekIndex,
        animated: true,
      });
    }
  }, [currentWeekIndex]);

  const handleDayPress = useCallback(
    (date: Date, weekIdx: number) => {
      updateCurrentDate(date);
      scrollRef.current?.scrollToIndex({ index: weekIdx, animated: true });
    },
    [updateCurrentDate]
  );

  return (
    <View style={{ marginTop: 16, marginBottom: 16 }}>
      <View
        style={{
          paddingHorizontal: 16,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "Nunito",
            fontSize: 24,
            fontWeight: "800",
            color: colors.text,
          }}
        >
          {format(currentDate, "MMMM yyyy", { locale: de })}
        </Text>
        <MonthSwitchHeaderBtns foreground />
      </View>

      <FlatList
        data={weeks}
        keyExtractor={(_, idx) => idx.toString()}
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: weekWidth + WEEK_GAP,
          offset: (weekWidth + WEEK_GAP) * index,
          index,
        })}
        snapToInterval={weekWidth + WEEK_GAP}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: SCROLL_HORIZONTAL_PADDING,
          gap: WEEK_GAP,
        }}
        renderItem={({ item: week, index }) => (
          <WeekRow
            week={week}
            weekIdx={index}
            dayWidth={dayWidth}
            onDayPress={handleDayPress}
          />
        )}
      />
    </View>
  );
};

export default MonthOverview;
