import { useCalendar } from "@/providers/calendar";
import { useTheme } from "@/providers/theme";
import { getDaysByMonth } from "@/utils/date";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import MonthSwitchHeaderBtns from "../calendar/MonthSwitchHeaderBtns";

const MonthOverview = () => {
  const scrollRef = React.useRef<ScrollView>(null);
  const barHeight = 148;
  const { colors } = useTheme();
  const { currentDate } = useCalendar();
  const days = getDaysByMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  React.useEffect(() => {
    // Scrollen zum aktuellen Tag, wenn der Monat gewechselt wird
    const currentDayIndex = days.findIndex(
      (day) =>
        day.getDate() === currentDate.getDate() &&
        day.getMonth() === currentDate.getMonth()
    );
    if (scrollRef.current && currentDayIndex !== -1) {
      const xOffset = currentDayIndex * 36; // 36 ist die Breite eines Tages
      scrollRef.current.scrollTo({ x: xOffset, animated: true });
    }
  }, [currentDate, days]);

  return (
    <View>
      <View
        style={{
          paddingHorizontal: 16,
          marginBottom: 16,
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
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 4,
        }}
      >
        {days.map((day, index) => (
          <View
            key={index}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              gap: 16,
            }}
          >
            <View
              style={{
                width: 10,
                height: barHeight,
                backgroundColor: colors.foreground + "aa",
                borderRadius: 8,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  height: Math.random() * 100 + 20,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 8,
                  backgroundColor:
                    day.getMonth() === currentDate.getMonth()
                      ? colors.success
                      : colors.textLight + "88",
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: "Nunito",
                fontSize: 16,
                fontWeight:
                  day.getDate() === currentDate.getDate() &&
                  day.getMonth() === currentDate.getMonth()
                    ? "900"
                    : "700",
                color:
                  day.getDate() === currentDate.getDate() &&
                  day.getMonth() === currentDate.getMonth()
                    ? colors.primary
                    : colors.textLight,
              }}
            >
              {day.getDate()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MonthOverview;
