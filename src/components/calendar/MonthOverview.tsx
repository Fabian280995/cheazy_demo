import { useCalendar } from "@/providers/calendar";
import { useTheme } from "@/providers/theme";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useMemo } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import MonthSwitchHeaderBtns from "./MonthSwitchHeaderBtns";
import { VerticalNutriBar } from "./VerticalNutritionBar";
import DayNutriIndicator from "./DayNutriIndicator";

/****************************
 * Layout constants
 ***************************/
const GAP = 12; // Abstand zwischen Tagen innerhalb einer Woche
const WEEK_GAP = 24; // Abstand zwischen Wochen
const SCROLL_HORIZONTAL_PADDING = 8; // paddingHorizontal des ScrollView

const TARGET_CAL = 3200; // Beispielwert für die Zielkalorien

/****************************
 * Helper: Wochen für einen Monat erzeugen
 ***************************/
const getWeeksByMonth = (year: number, month: number) => {
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);

  // Deutsche Woche beginnt Montag → Offset bestimmen
  const firstMondayOffset = (firstOfMonth.getDay() + 6) % 7; // Montag = 0, Sonntag = 6
  const calendarStart = new Date(firstOfMonth);
  calendarStart.setDate(firstOfMonth.getDate() - firstMondayOffset);

  const weeks: Date[][] = [];
  let cursor = new Date(calendarStart);

  while (
    cursor <= lastOfMonth ||
    weeks.length === 0 ||
    weeks[weeks.length - 1].length < 7
  ) {
    const currentWeek: Date[] = [];
    for (let i = 0; i < 7; i++) {
      currentWeek.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(currentWeek);
  }
  return weeks;
};

/****************************
 * Component
 ***************************/
const MonthOverview = ({ canOpen = false }: { canOpen?: boolean }) => {
  const [isOpen, setIsOpen] = React.useState(false); // standardmäßig geschlossen
  const scrollRef = React.useRef<Animated.ScrollView>(null);

  const { width: screenWidth } = useWindowDimensions();

  const { colors } = useTheme();
  const { currentDate, updateCurrentDate } = useCalendar();

  // Dynamische Breite je Tag berechnen (responsive)
  const dayWidth = useMemo(
    () => (screenWidth - SCROLL_HORIZONTAL_PADDING * 2 - GAP * 6) / 7,
    [screenWidth]
  );

  // Gesamtbreite einer Woche (7 Tage + interne Abstände)
  const weekWidth = useMemo(() => dayWidth * 7 + GAP * 6, [dayWidth]);

  // Wochen-Array nur bei Monatswechsel neu berechnen
  const weeks = useMemo(
    () => getWeeksByMonth(currentDate.getFullYear(), currentDate.getMonth()),
    [currentDate.getFullYear(), currentDate.getMonth()]
  );

  // Index der Woche, die den aktuellen Tag enthält
  const currentWeekIndex = useMemo(
    () =>
      weeks.findIndex((week) =>
        week.some(
          (day) =>
            day.getDate() === currentDate.getDate() &&
            day.getMonth() === currentDate.getMonth()
        )
      ),
    [weeks, currentDate]
  );

  /**************************************************
   * Scroll immer auf die aktuelle Woche positionieren
   **************************************************/
  useEffect(() => {
    if (scrollRef.current && currentWeekIndex !== -1) {
      const xOffset = currentWeekIndex * (weekWidth + WEEK_GAP);
      scrollRef.current.scrollTo({ x: xOffset, animated: true });
    }
  }, [currentWeekIndex, weekWidth]);

  // Öffnen/Schließen basierend auf canOpen
  useEffect(() => {
    if (!canOpen) setIsOpen(false);
  }, [canOpen]);

  return (
    <View style={{ marginTop: 16, marginBottom: 16 }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 16,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Monatstitel + Toggle */}
        <TouchableOpacity
          onPress={() => setIsOpen(!isOpen)}
          style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
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

      {/* Wochen-ScrollView */}
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
              // Dummy-Daten für Kalorienfortschritt
              const value = Math.random() * TARGET_CAL;

              const isCurrentDay =
                day.getDate() === currentDate.getDate() &&
                day.getMonth() === currentDate.getMonth();

              const isCurrentMonth = day.getMonth() === currentDate.getMonth();

              return (
                <TouchableOpacity
                  key={dayIdx}
                  onPress={() => {
                    updateCurrentDate(day);
                    // Sofort zur passenden Woche scrollen (UX smoother)
                    if (scrollRef.current) {
                      scrollRef.current.scrollTo({
                        x: weekIdx * (weekWidth + WEEK_GAP),
                        animated: true,
                      });
                    }
                  }}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: dayWidth,
                    opacity: isCurrentMonth ? 1 : 0.3, // Tage außerhalb des Monats abdunkeln
                  }}
                >
                  {/* Vertikale Bar nur, wenn geöffnet */}
                  {isOpen && (
                    <VerticalNutriBar
                      progress={value / TARGET_CAL}
                      isCurrentDay={isCurrentDay}
                    />
                  )}

                  {/* Kalorien-Ring nur im kompakten Modus und für Tage des akt. Monats */}
                  <DayNutriIndicator
                    size={dayWidth * 0.9}
                    value={value}
                    ringShown={!isOpen && isCurrentMonth}
                    target={TARGET_CAL}
                    date={day.getDate()}
                    isCurrentDay={isCurrentDay}
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
