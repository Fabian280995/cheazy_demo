import { useCalendar } from "@/providers/calendar";
import { useTheme } from "@/providers/theme";
import React, { useEffect, useMemo } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import DayNutriIndicator from "./DayNutriIndicator";
import MonthSwitchHeaderBtns from "./MonthSwitchHeaderBtns";

// constants
const GAP = 12;
const WEEK_GAP = 24;
const SCROLL_HORIZONTAL_PADDING = 8;
const TARGET_CAL = 3200;

// build calendar weeks (always Monday–Sunday)
const getWeeksByMonth = (year: number, month: number) => {
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);
  const firstMondayOffset = (firstOfMonth.getDay() + 6) % 7;
  const calendarStart = new Date(firstOfMonth);
  calendarStart.setDate(firstOfMonth.getDate() - firstMondayOffset);

  const weeks: Date[][] = [];
  let cursor = new Date(calendarStart);

  while (cursor <= lastOfMonth || weeks[weeks.length - 1]?.length !== 7) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
};

const MonthOverview = () => {
  const scrollRef = React.useRef<Animated.ScrollView>(null);
  const { width: screenWidth } = useWindowDimensions();
  const { colors } = useTheme();
  const { currentDate, updateCurrentDate } = useCalendar();
  const today = useMemo(() => new Date(), []);

  const dayWidth = useMemo(
    () => (screenWidth - SCROLL_HORIZONTAL_PADDING * 2 - GAP * 6) / 7,
    [screenWidth]
  );
  const weekWidth = useMemo(() => dayWidth * 7 + GAP * 6, [dayWidth]);
  const weeks = useMemo(
    () => getWeeksByMonth(currentDate.getFullYear(), currentDate.getMonth()),
    [currentDate.getFullYear(), currentDate.getMonth()]
  );
  const currentWeekIndex = useMemo(
    () =>
      weeks.findIndex((w) =>
        w.some(
          (d) =>
            d.getDate() === currentDate.getDate() &&
            d.getMonth() === currentDate.getMonth()
        )
      ),
    [weeks, currentDate]
  );

  // keep scroll synced with currentDate
  useEffect(() => {
    if (scrollRef.current && currentWeekIndex !== -1) {
      scrollRef.current.scrollTo({
        x: currentWeekIndex * (weekWidth + WEEK_GAP),
        animated: true,
      });
    }
  }, [currentWeekIndex, weekWidth]);

  return (
    <View style={{ marginTop: 16, marginBottom: 16 }}>
      {/* header */}
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
          {currentDate.toLocaleDateString("de-DE", {
            month: "long",
            year: "numeric",
          })}
        </Text>
        <MonthSwitchHeaderBtns foreground />
      </View>

      {/* week scroll */}
      <Animated.ScrollView
        horizontal
        ref={scrollRef}
        layout={LinearTransition}
        showsHorizontalScrollIndicator={false}
        snapToInterval={weekWidth + WEEK_GAP}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: SCROLL_HORIZONTAL_PADDING,
          gap: WEEK_GAP,
        }}
      >
        {weeks.map((week, weekIdx) => (
          <View
            key={weekIdx}
            style={{ flexDirection: "row", gap: GAP, width: weekWidth }}
          >
            {week.map((day, dayIdx) => {
              const value = Math.random() * TARGET_CAL;
              const isCurrentDay =
                day.getDate() === currentDate.getDate() &&
                day.getMonth() === currentDate.getMonth();
              const inMonth = day.getMonth() === currentDate.getMonth();

              return (
                <TouchableOpacity
                  key={dayIdx}
                  onPress={() => {
                    updateCurrentDate(day);
                    scrollRef.current?.scrollTo({
                      x: weekIdx * (weekWidth + WEEK_GAP),
                      animated: true,
                    });
                  }}
                  style={{
                    alignItems: "center",
                    width: dayWidth,
                    opacity: inMonth ? 1 : 0.3,
                  }}
                >
                  <DayNutriIndicator
                    size={dayWidth * 0.9}
                    value={value}
                    ringShown={inMonth}
                    target={TARGET_CAL}
                    date={day.getDate()}
                    isCurrentDay={isCurrentDay}
                    isToday={
                      day.getDate() === today.getDate() &&
                      day.getMonth() === today.getMonth() &&
                      day.getFullYear() === today.getFullYear()
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default MonthOverview;
