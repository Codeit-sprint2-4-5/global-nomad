import { useInfiniteQuery, QueryFunction } from '@tanstack/react-query';

interface useCustomInfiniteQueryProps {
  queryKey: string[];
  queryFn: QueryFunction<any>;
}

export function useCustomInfiniteQuery({
  queryKey,
  queryFn,
}: useCustomInfiniteQueryProps) {
  const { fetchNextPage, hasNextPage, isFetching, data } = useInfiniteQuery({
    queryKey,
    queryFn: queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  return {
    fetchNextPage,
    hasNextPage,
    isFetching,
    data,
  };
}
