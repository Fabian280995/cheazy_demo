import { useCalendar } from "@/providers/calendar";
import { useTheme } from "@/providers/theme";
import { getDaysByMonth } from "@/utils/date";
import { Feather } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import CaloryRing from "../shared/CaloryRing";
import MonthSwitchHeaderBtns from "./MonthSwitchHeaderBtns";
import { VerticalNutriBar } from "./VerticalNutritionBar";

const GAP = 12;
const DAY_WIDTH = 36;

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
              {isOpen ? (
                <VerticalNutriBar
                  progress={value / TARGET_CAL}
                  isCurrentDay={
                    day.getDate() === currentDate.getDate() &&
                    day.getMonth() === currentDate.getMonth()
                  }
                />
              ) : null}
              <Animated.View
                layout={LinearTransition}
                style={{
                  width: DAY_WIDTH,
                  height: DAY_WIDTH,
                  backgroundColor: colors.background,
                }}
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

export default MonthOverview;
