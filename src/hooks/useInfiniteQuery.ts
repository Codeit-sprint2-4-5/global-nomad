import { useInfiniteQuery, QueryFunction } from "@tanstack/react-query";

interface useCustomInfiniteQueryProps {
  queryKey: string[];
  queryFn: QueryFunction<any>;
}

export function useCustomInfiniteQuery({
  queryKey,
  queryFn,
}: useCustomInfiniteQueryProps) {
  const { fetchNextPage, hasNextPage, isFetching, data } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    getNextPageParam: (lastPage) =>
      lastPage.cursorId === null ? undefined : lastPage.cursorId,
    initialPageParam: undefined,
  });

  return {
    fetchNextPage,
    hasNextPage,
    isFetching,
    data,
  };
}
