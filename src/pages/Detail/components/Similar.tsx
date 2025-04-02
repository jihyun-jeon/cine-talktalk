import { useGetSimilarMovieInfiniteQuery } from '@/hooks/query/useMovie';
import { TMDB_LANGUAGE_KR } from '@/contants';
import PosterImage from '@/components/PosterImage';
import { useEffect, useRef, useCallback } from 'react';

interface SimilarProps {
  movieId: number;
  setPathParam: (movieId: number) => void;
}

const Similar = ({ movieId, setPathParam }: SimilarProps) => {
  const {
    data: similarData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetSimilarMovieInfiniteQuery(movieId, {
    language: TMDB_LANGUAGE_KR,
  });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) {
      observer.current.disconnect();
    }
    if (node && observer.current) {
      observer.current.observe(node);
    }
  }, []);

  useEffect(() => {
    const currentObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.current = currentObserver;

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="mx-0 my-auto">
      <h2 className="font-semibold">비슷한 콘텐츠</h2>
      <div className="flex flex-wrap justify-start gap-5">
        {similarData?.pages.map((page, pageIndex) =>
          page.results.map((movie, index) => (
            <div
              key={movie.id}
              ref={
                pageIndex === similarData.pages.length - 1 && index === page.results.length - 1
                  ? lastMovieRef
                  : undefined
              }
              className="relative w-52 flex flex-col cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setPathParam(movie.id)}
            >
              <PosterImage posterPath={movie.poster_path} size="w500" />
              <div className="ellipsis-base ellipsis-2">{movie.title}</div>
            </div>
          )),
        )}
      </div>
      {isFetchingNextPage && (
        <div className="w-full text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-white border-r-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default Similar;
