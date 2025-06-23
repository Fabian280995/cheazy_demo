// hooks/useDailyCalories.ts
import { getDailyCalories } from "@/api/daily-calories";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

type Params = { start: Date; end: Date };

export function useDailyCalories({ start, end }: Params) {
  const keyStart = format(start, "yyyy-MM-dd");
  const keyEnd = format(end, "yyyy-MM-dd");

  return useQuery({
    queryKey: ["daily-calories", keyStart, keyEnd],
    queryFn: () => getDailyCalories({ start: keyStart, end: keyEnd }),

    staleTime: 1000 * 60 * 5,
    enabled: !!start && !!end,
  });
}
