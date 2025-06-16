import { getFoodById } from "@/api/foods";
import { useQuery } from "@tanstack/react-query";

export const useGetFoodById = (id: string) => {
  return useQuery({
    queryKey: ["foods", id],
    queryFn: () => getFoodById(id),
    enabled: !!id,
  });
};
