import { RefObject, useEffect } from 'react';

interface IntersectionObserverProps {
  observerRef: RefObject<Element>;
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
}

const useIntersectionObserver = ({
  observerRef,
  hasNextPage,
  isFetching,
  fetchNextPage,
}: IntersectionObserverProps) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage && !isFetching) {
            fetchNextPage();
          }
        });
      },
      { threshold: 1 }
    );

    if (observerRef.current && hasNextPage) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [observerRef, hasNextPage, isFetching, fetchNextPage]);
};

export default useIntersectionObserver;
