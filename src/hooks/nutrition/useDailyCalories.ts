// hooks/useDailyCalories.ts
import { getDailyCalories } from "@/api/daily-calories";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

type Params = { start: Date; end: Date };

export function useDailyCalories({ start, end }: Params) {
  /** Query-Key niemals rohe Date-Objekte geben – die sind referenziell verschieden.
   *  Besser: in stabile ISO-Strings transformieren. */
  const keyStart = format(start, "yyyy-MM-dd");
  const keyEnd = format(end, "yyyy-MM-dd");

  return useQuery({
    queryKey: ["daily-calories", keyStart, keyEnd],
    queryFn: () => getDailyCalories({ start: keyStart, end: keyEnd }),

    staleTime: 1000 * 60 * 5,
    enabled: !!start && !!end,
  });
}
