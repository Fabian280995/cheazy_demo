// utils/date.ts
import { Week } from "../types";

/** Montag der Woche, in der `date` liegt */
export const startOfWeek = (date: Date): Date => {
  const d = new Date(date);
  const dow = (d.getDay() + 6) % 7; // So(0) → 6, Mo(1) → 0, …
  d.setDate(d.getDate() - dow);
  d.setHours(0, 0, 0, 0); // Mitternacht
  return d;
};

/** true, wenn beide Datumswerte dasselbe Kalendertag darstellen */
export const sameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/** Liefert alle Wochen eines Monats – jeweils **vollständig** (Mo–So).
 *  Fehlende Tage am Rand werden mit Daten aus Nachbar­monaten gefüllt. */
export const getMonthWeeks = (year: number, month: number): Week[] => {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);

  let cursor = startOfWeek(first);
  const weeks: Week[] = [];

  while (cursor <= last || weeks.length === 0) {
    const week: Week = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(cursor);
      day.setDate(day.getDate() + i);
      return day;
    });
    weeks.push(week);
    cursor.setDate(cursor.getDate() + 7); // zum nächsten Montag
  }

  return weeks;
};
