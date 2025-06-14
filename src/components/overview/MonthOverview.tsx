import { useCalendar } from "@/providers/calendar";
import { useTheme } from "@/providers/theme";
import { getDaysByMonth } from "@/utils/date";
import { Feather } from "@expo/vector-icons";
import React, { use, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import MonthSwitchHeaderBtns from "../calendar/MonthSwitchHeaderBtns";
import CaloryRing from "../shared/CaloryRing";

const GAP = 12;
const DAY_WIDTH = 36;
const BAR_HEIGHT = 112; // Höhe der vertikalen Balken

const TARGET_CAL = 3200; // Beispielwert für die Zielkalorien

const MonthOverview = ({ canOpen = false }: { canOpen?: boolean }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const scrollRef = React.useRef<Animated.ScrollView>(null);
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

  useEffect(() => {
    if (!canOpen) {
      setIsOpen(false);
    }
  }, [canOpen]);

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
          disabled={!canOpen}
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
          {canOpen && (
            <Feather
              name={isOpen ? "chevron-up" : "chevron-down"}
              size={24}
              color={colors.text}
            />
          )}
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
          const value = Math.random() * TARGET_CAL;
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
                  progress={value / TARGET_CAL}
                  isCurrentDay={
                    day.getDate() === currentDate.getDate() &&
                    day.getMonth() === currentDate.getMonth()
                  }
                />
              )}
              <Animated.View
                layout={LinearTransition}
                style={{ width: DAY_WIDTH, height: DAY_WIDTH }}
              >
                {!isOpen && (
                  <CaloryRing
                    progress={value / TARGET_CAL}
                    size={DAY_WIDTH}
                    stroke={4}
                    trackColor={colors.foreground + "22"}
                    progressColor={colors.success}
                  />
                )}
                <View
                  style={[
                    {
                      position: "absolute",
                      inset: 0,
                      alignItems: "center",
                      justifyContent: "center",
                      width: DAY_WIDTH,
                      height: DAY_WIDTH,
                    },
                  ]}
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
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const VerticalBar = ({
  progress,
  isCurrentDay,
}: {
  progress: number;
  isCurrentDay: boolean;
}) => {
  const { colors } = useTheme();

  return (
    <Animated.View
      entering={FadeIn.delay(300)}
      exiting={FadeIn.delay(200)}
      style={{
        width: 12,
        height: BAR_HEIGHT,
        backgroundColor: colors.foreground + "aa",
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 8,
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          height: progress * BAR_HEIGHT,
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
