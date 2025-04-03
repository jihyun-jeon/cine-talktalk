import React, { useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface InfiniteScrollProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  children: (intersectRef: (node: HTMLDivElement | null) => void) => React.ReactNode;
}

const InfiniteScroll = ({ hasNextPage, isFetchingNextPage, fetchNextPage, children }: InfiniteScrollProps) => {
  const [intersectRef, isIntersectingView] = useIntersectionObserver({
    threshold: 0.1,
  });

  useEffect(() => {
    if (isIntersectingView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersectingView]);

  return <>{children(intersectRef)}</>;
};
export default InfiniteScroll;
