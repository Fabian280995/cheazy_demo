import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { fullTextSearch, FoodSearchResponseItem } from "@/api/foods";

type SearchOptions = {
  pageSize?: number;
};

export function useFoodSearch({ pageSize = 25 }: SearchOptions = {}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [results, setResults] = useState<FoodSearchResponseItem[]>([]);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async ({ q, page }: { q: string; page: number }) =>
      fullTextSearch(q, page, pageSize),
    onSuccess: (data, variables) => {
      setResults((prev) => (variables.page === 0 ? data : [...prev, ...data]));
    },
  });

  const search = useCallback(
    (q: string) => {
      setQuery(q);
      setPage(0);
      mutate({ q, page: 0 });
    },
    [mutate]
  );

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    mutate({ q: query, page: nextPage });
  }, [page, query, mutate]);

  return {
    results,
    search,
    loadMore,
    isLoading: isPending,
    isError,
    error,
    hasMore: results.length === (page + 1) * pageSize, // grobe Heuristik
  };
}
