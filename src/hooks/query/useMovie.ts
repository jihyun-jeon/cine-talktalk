import { useQuery } from '@tanstack/react-query';
import {
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchGenres,
  fetchGenreFilteredMovies,
  fetchKeywordFilteredMovies,
  fetchSimilarMovies,
  fetchMovieDetail,
} from '@/api/movie';
import { baseSearchParam, genreSearchParam, keywordSearchParam } from '@/types/movieType';
import { useInfiniteQuery } from '@tanstack/react-query';

/** 인기 영화 요청 */
export const usePopularMoviesQuery = (queryParams: baseSearchParam) =>
  useQuery({
    queryFn: () => fetchPopularMovies(queryParams),
    queryKey: MoviesQuery.getMany('getPopular', queryParams),
    throwOnError: true, // 이 쿼리에서만 에러를 throw
  });

/** 트렌딩 영화 요청 */
export const useTrendingMoviesQuery = (queryParams: baseSearchParam) =>
  useQuery({
    queryFn: () => fetchTrendingMovies(queryParams),
    queryKey: MoviesQuery.getMany('getTrending', queryParams),
    throwOnError: true,
  });

/** 장르 목록 요청 */
export const useGetGenresQuery = (queryParams: baseSearchParam) =>
  useQuery({
    queryFn: () => fetchGenres(queryParams),
    queryKey: MoviesQuery.getMany('getGenres', queryParams),
  });

/** 장르 필터링된 영화 요청 */
export const useGenreSearchMoviesQuery = (queryParams: genreSearchParam, isFetchEnabled: boolean) =>
  useQuery({
    enabled: isFetchEnabled,
    queryFn: () => fetchGenreFilteredMovies(queryParams),
    queryKey: MoviesQuery.getMany('discoverMovie', queryParams),
  });

/** 검색어 필터링된 영화 요청 */
export const useKeywordSearchMoviesQuery = (queryParams: keywordSearchParam, isFetchEnabled: boolean) =>
  useQuery({
    enabled: isFetchEnabled,
    queryFn: () => fetchKeywordFilteredMovies(queryParams),
    queryKey: MoviesQuery.getMany('searchMovie', queryParams),
  });

/** 비슷한 영화 요청 (무한 스크롤X)*/
export const useGetSimilarMovieQuery = (movieId: number, queryParams: baseSearchParam) =>
  useQuery({
    queryFn: () => fetchSimilarMovies(movieId, queryParams),
    queryKey: MoviesQuery.getMany('similarMovie', movieId),
  });

/** 비슷한 영화 요청 (무한 스크롤) */
export const useGetSimilarMovieInfiniteQuery = (movieId: number, queryParams: baseSearchParam) =>
  useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => fetchSimilarMovies(movieId, { ...queryParams, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.total_pages) return undefined;
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
      return undefined;
    },
    initialPageParam: 1,
    queryKey: MoviesQuery.getMany('similarMovie', movieId),
  });

/** 영화 세부정보 요청 */
export const useGetDetailMovieQuery = (movieId: number, queryParams: baseSearchParam) =>
  useQuery({
    queryFn: () => fetchMovieDetail(movieId, queryParams),
    queryKey: MoviesQuery.getOne(movieId),
    throwOnError: true,
  });

export const MoviesQuery = {
  all: ['movies'],
  getMany: (getCategory: string, queryParams?: any) => [
    ...MoviesQuery.all,
    'getMany',
    getCategory,
    JSON.stringify(queryParams),
  ],
  getOne: (id: number) => [...MoviesQuery.all, 'getOne', id],
};
