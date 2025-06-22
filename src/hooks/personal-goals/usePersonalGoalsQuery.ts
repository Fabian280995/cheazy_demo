import { getPersonalGoals } from "@/api/personal-goals";
import { useQuery } from "@tanstack/react-query";

export const usePersonalGoalsQuery = () => {
  return useQuery({
    queryKey: ["personalGoals"],
    queryFn: () => getPersonalGoals(),
  });
};
