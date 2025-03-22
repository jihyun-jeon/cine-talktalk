import axiosInstance from '@/api/axios';
import {
  baseSearchParam,
  genreSearchParam,
  GenresResponse,
  keywordSearchParam,
  MovieDetail,
  MovieResponse,
} from '@/types/movieType';

/** 인기 영화 요청 */
export const fetchPopularMovies = (queryParams: baseSearchParam) =>
  axiosInstance<MovieResponse>({
    url: '/movie/popular',
    method: 'get',
    params: queryParams,
  }).then(({ data }) => data);

/** 트렌딩 영화 요청 */
export const fetchTrendingMovies = (queryParams: baseSearchParam) =>
  axiosInstance<MovieResponse>({
    url: '/trending/movie/day',
    method: 'get',
    params: queryParams,
  }).then(({ data }) => data);

/** 장르 목록 요청 */
export const fetchGenres = (queryParams: baseSearchParam) =>
  axiosInstance<GenresResponse>({
    url: '/genre/movie/list',
    method: 'get',
    params: queryParams,
  }).then(({ data }) => data);

/** 장르 필터링된 영화 요청 */
export const fetchGenreFilteredMovies = (queryParams: genreSearchParam) =>
  axiosInstance<MovieResponse>({
    url: '/discover/movie',
    method: 'get',
    params: queryParams,
  }).then(({ data }) => data);

/** 검색어 필터링된 영화 요청 */
export const fetchKeywordFilteredMovies = (queryParams: keywordSearchParam) =>
  axiosInstance<MovieResponse>({
    url: '/search/movie',
    method: 'get',
    params: queryParams,
  }).then(({ data }) => data);

/** 비슷한 영화 요청 */
export const fetchSimilarMovies = (movieId: number, queryParams: baseSearchParam) =>
  axiosInstance<MovieResponse>({
    url: `/movie/${movieId}/similar`,
    method: 'get',
    params: queryParams,
  }).then(({ data }) => data);

/** 영화 세부정보 요청 */
export const fetchMovieDetail = (movieId: number, queryParams: baseSearchParam) =>
  axiosInstance<MovieDetail>({
    url: `/movie/${movieId}`,
    method: 'get',
    params: queryParams,
  }).then(({ data }) => data);
