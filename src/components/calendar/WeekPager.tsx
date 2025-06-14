// WeekPager.tsx
import React, { useRef } from "react";
import { ScrollView } from "react-native";
import { Week as WeekType } from "@/types";
import Week from "./Week";
import useAutoScrollToWeek from "@/hooks/calendar/useAutoScrollToWeek";

type Props = { weeks: WeekType[]; width: number };

const WeekPager: React.FC<Props> = ({ weeks, width }) => {
  const ref = useRef<ScrollView>(null);
  useAutoScrollToWeek(ref, weeks, width);

  return (
    <ScrollView
      horizontal
      pagingEnabled
      ref={ref}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {weeks.map((w) => (
        <Week key={w[0].toISOString()} week={w} width={width} />
      ))}
    </ScrollView>
  );
};

export default WeekPager;
