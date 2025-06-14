// hooks/useAutoScrollToWeek.ts
import { RefObject, useEffect } from "react";
import { ScrollView } from "react-native";
import { Week } from "@/types";
import { sameDay } from "@/utils/date";
import { useCalendar } from "@/providers/calendar";

export default function useAutoScrollToWeek(
  ref: RefObject<ScrollView | null>, // ←  | null dazu
  weeks: Week[],
  containerWidth: number
) {
  const { currentDate } = useCalendar();

  useEffect(() => {
    const idx = weeks.findIndex((w) => w.some((d) => sameDay(d, currentDate)));
    if (idx >= 0 && ref.current) {
      ref.current.scrollTo({ x: idx * containerWidth, animated: true });
    }
  }, [weeks, currentDate, containerWidth, ref]);
}
