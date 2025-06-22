import { getActivePersonalGoal } from "@/api/personal-goals";
import { useQuery } from "@tanstack/react-query";

export const useActivePersonalGoalQuery = (date: string) => {
  return useQuery({
    queryKey: ["personalGoals", "active", date],
    queryFn: () => getActivePersonalGoal(date),
  });
};
