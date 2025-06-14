// hooks/useMonthWeeks.ts
import { useMemo } from "react";
import { useCalendar } from "@/providers/calendar";
import { getMonthWeeks } from "@/utils/date";

/** Gibt die Wochenmatrix für den aktuell gewählten Monat zurück. */
export default function useMonthWeeks() {
  const { currentDate } = useCalendar();

  return useMemo(
    () => getMonthWeeks(currentDate.getFullYear(), currentDate.getMonth()),
    [currentDate] // wird neu berechnet, wenn sich der Monat ändert
  );
}
