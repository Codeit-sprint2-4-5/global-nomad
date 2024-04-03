import { RefObject, useEffect } from 'react';

interface IntersectionObserverProps {
  observerRef: RefObject<Element>;
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
  loadingShow?: boolean;
}

const useIntersectionObserver = ({
  observerRef,
  hasNextPage,
  isFetching,
  fetchNextPage,
  loadingShow,
}: IntersectionObserverProps) => {
  useEffect(() => {
    if (!loadingShow) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && hasNextPage && !isFetching) {
              fetchNextPage();
            }
          });
        },
        { threshold: 0.5 }
      );

      if (observerRef.current && hasNextPage) {
        observer.observe(observerRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [observerRef, hasNextPage, isFetching, fetchNextPage, loadingShow]);
};

export default useIntersectionObserver;
