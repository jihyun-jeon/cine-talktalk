import { useCallback, useRef, useState, useEffect } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
}: UseIntersectionObserverProps) => {
  const [isIntersectingView, setIsIntersectingView] = useState(false); // 감지된 요소가 보이는지 여부
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const currentObserver = new IntersectionObserver(
      (entries) => {
        // entries : 감지된 요소들의 배열 , 화면에 보이는 요소들의 배열.
        setIsIntersectingView(entries[0].isIntersecting); // 마지막 요소가 화면에 보이는지 감지.
      },
      { threshold, root, rootMargin },
    );

    observer.current = currentObserver; // 옵저버 저장.

    // 컴포넌트가 언마운트될 때 옵저버를 해제.
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  const lastMovieRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) {
      observer.current.disconnect(); // 기존 관찰 제거하고
    }
    if (node && observer.current) observer.current.observe(node); // 새로운 관찰 시작
  }, []);

  return [lastMovieRef as any, isIntersectingView];
};
