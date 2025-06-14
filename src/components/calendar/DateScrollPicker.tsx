// DateScrollPicker.tsx
import React, { useState, useCallback } from "react";
import { View, LayoutChangeEvent, Dimensions } from "react-native";
import WeekPager from "./WeekPager";
import WeekdayFooter from "./WeekdayFooter";
import useMonthWeeks from "@/hooks/calendar/useMonthWeeks";

interface Props {
  small?: boolean;
}

const DateScrollPicker = ({ small = false }: Props) => {
  const [width, setWidth] = useState(Dimensions.get("window").width);
  const weeks = useMonthWeeks();
  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  }, []);

  return (
    <View onLayout={onLayout} style={{ marginTop: small ? 4 : 12 }}>
      <WeekPager weeks={weeks} width={width} />
      {!small && <WeekdayFooter cellWidth={width / 7} />}
    </View>
  );
};
export default DateScrollPicker;
