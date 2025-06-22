import { getActivePersonalGoal } from "@/api/personal-goals";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export const useActivePersonalGoalQuery = (date: Date) => {
  const formattedDate = format(date, "yyyy-MM-dd");
  return useQuery({
    queryKey: ["personalGoals", "active", formattedDate],
    queryFn: () => getActivePersonalGoal(formattedDate),
  });
};
