import { useMutation } from "@tanstack/react-query";
import { searchFoodIds } from "@/api/foods";

export function useSearchFoodIds() {
  return useMutation({
    mutationFn: searchFoodIds,
  });
}
