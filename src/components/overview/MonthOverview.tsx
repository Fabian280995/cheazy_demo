import { useCalendar } from "@/providers/calendar";
import { useTheme } from "@/providers/theme";
import { getDaysByMonth } from "@/utils/date";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import MonthSwitchHeaderBtns from "../calendar/MonthSwitchHeaderBtns";

const GAP = 12;
const DAY_WIDTH = 36;

const MonthOverview = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const scrollRef = React.useRef<Animated.ScrollView>(null);
  const barHeight = 112;
  const { colors } = useTheme();
  const { currentDate, updateCurrentDate } = useCalendar();
  const days = getDaysByMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  React.useEffect(() => {
    const currentDayIndex = days.findIndex(
      (day) =>
        day.getDate() === currentDate.getDate() &&
        day.getMonth() === currentDate.getMonth()
    );
    if (scrollRef.current && currentDayIndex !== -1) {
      const xOffset = currentDayIndex * (DAY_WIDTH + GAP) - 8;
      scrollRef.current.scrollTo({ x: xOffset, animated: true });
    }
  }, [currentDate, days]);

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
        <TouchableOpacity
          onPress={() => setIsOpen(!isOpen)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
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
          <Feather
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <MonthSwitchHeaderBtns foreground />
      </View>
      <Animated.ScrollView
        layout={LinearTransition}
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 4,
          gap: GAP,
        }}
      >
        {days.map((day, index) => {
          const value = Math.random() * 100 + 20;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                updateCurrentDate(day);
                if (scrollRef.current) {
                  const xOffset = index * (DAY_WIDTH + GAP);
                  scrollRef.current.scrollTo({ x: xOffset, animated: true });
                }
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: DAY_WIDTH,
              }}
            >
              {isOpen && (
                <VerticalBar
                  value={value}
                  barHeight={barHeight}
                  isCurrentDay={
                    day.getDate() === currentDate.getDate() &&
                    day.getMonth() === currentDate.getMonth()
                  }
                />
              )}
              <Animated.View
                layout={LinearTransition}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: DAY_WIDTH,
                  height: DAY_WIDTH,
                  borderRadius: 100,
                  backgroundColor: isOpen
                    ? colors.background
                    : colors.foreground,
                }}
              >
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
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const VerticalBar = ({
  value,
  barHeight,
  isCurrentDay,
}: {
  value: number;
  barHeight: number;
  isCurrentDay: boolean;
}) => {
  const { colors } = useTheme();

  return (
    <Animated.View
      entering={FadeIn.delay(300)}
      exiting={FadeIn.delay(200)}
      style={{
        width: 12,
        height: barHeight,
        backgroundColor: colors.foreground + "aa",
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 8,
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          height: value,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 8,
          backgroundColor: isCurrentDay
            ? colors.success
            : colors.textLight + "88",
        }}
      />
    </Animated.View>
  );
};

export default MonthOverview;
