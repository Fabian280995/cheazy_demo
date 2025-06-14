import React, { createContext, useContext, useState } from "react";

type CalendarContextType = {
  currentDate: Date;
  updateCurrentDate: (date: Date) => void;
  increaseDay: () => void;
  decreaseDay: () => void;
  increaseMonth: () => void;
  decreaseMonth: () => void;
  increaseYear: () => void;
  decreaseYear: () => void;
  toggleCalendarMenu: () => void;
  calendarMenuShown: boolean;
};

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export const useCalendar = (): CalendarContextType => {
  const ctx = useContext(CalendarContext);
  if (!ctx) throw new Error("useCalendar must be inside CalendarProvider");
  return ctx;
};

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [calendarMenuShown, setCalendarMenuShown] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const updateCurrentDate = (date: Date) => {
    setCurrentDate(date);
  };

  // Hilfsfunktionen
  const getNextDay = (date: Date): Date => {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    return next;
  };

  const getPreviousDay = (date: Date): Date => {
    const prev = new Date(date);
    prev.setDate(prev.getDate() - 1);
    return prev;
  };

  const getMonthAdjustedDate = (date: Date, deltaMonths: number): Date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const target = new Date(year, month + deltaMonths, 1);
    const daysInTarget = new Date(
      target.getFullYear(),
      target.getMonth() + 1,
      0
    ).getDate();
    target.setDate(Math.min(day, daysInTarget));
    return target;
  };

  const getYearAdjustedDate = (date: Date, deltaYears: number): Date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const target = new Date(year + deltaYears, month, 1);
    const daysInTarget = new Date(
      target.getFullYear(),
      target.getMonth() + 1,
      0
    ).getDate();
    target.setDate(Math.min(day, daysInTarget));
    return target;
  };

  // Funktionen zum Anpassen der Zeit
  const increaseDay = () => updateCurrentDate(getNextDay(currentDate));
  const decreaseDay = () => updateCurrentDate(getPreviousDay(currentDate));
  const increaseMonth = () =>
    updateCurrentDate(getMonthAdjustedDate(currentDate, 1));
  const decreaseMonth = () =>
    updateCurrentDate(getMonthAdjustedDate(currentDate, -1));
  const increaseYear = () =>
    updateCurrentDate(getYearAdjustedDate(currentDate, 1));
  const decreaseYear = () =>
    updateCurrentDate(getYearAdjustedDate(currentDate, -1));

  const toggleCalendarMenu = () => {
    setCalendarMenuShown((prev) => !prev);
  };

  const value: CalendarContextType = {
    calendarMenuShown,
    currentDate,
    updateCurrentDate,
    increaseDay,
    decreaseDay,
    increaseMonth,
    decreaseMonth,
    increaseYear,
    decreaseYear,
    toggleCalendarMenu,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
