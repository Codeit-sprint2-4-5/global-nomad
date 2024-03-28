import { useInfiniteQuery } from '@tanstack/react-query';

interface Props {
  queryKey: (string | number | object)[];
  queryFn: ({
    pageParam,
  }: {
    pageParam: number | undefined;
  }) => { cursorId: number | undefined } & any;
}

export const useCustomInfiniteQuery = ({ queryKey, queryFn }: Props) =>
  useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.cursorId,
    select: (data) => ({
      pages: data?.pages.flatMap(
        (page) => page.reservations || page.activities || page.reservation || []
      ),
      totalCount: data?.pages[0].totalCount,
    }),
  });
