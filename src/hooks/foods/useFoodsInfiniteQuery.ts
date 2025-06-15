import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchFoodsByIds } from "@/api/foods";

export function useFoodsInfiniteQuery(allIds: string[], pageSize = 15) {
  return useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["foods", allIds],
    enabled: allIds.length > 0,
    getNextPageParam: (lastPage, pages) => {
      const nextIndex = pages.length * pageSize;
      return nextIndex < allIds.length ? nextIndex : undefined;
    },
    queryFn: ({ pageParam = 0 }) =>
      fetchFoodsByIds(allIds.slice(pageParam, pageParam + pageSize)),
  });
}
