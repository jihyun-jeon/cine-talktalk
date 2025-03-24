import axiosInstance from '@/api/axios';
import { baseSearchParam } from '@/types/movieType';
import { MovieCredit } from '@/types/actor';
import CommonError from '@/interceptor/CommonError';

/** 영화 크레딧 정보 요청 */
export const fetchCredit = (movieId: number, queryParams: baseSearchParam) =>
  axiosInstance<MovieCredit>({
    url: `/movie/${movieId}/credits`,
    method: 'get',
    params: queryParams,
    headers: {
      [CommonError.SKIP]: 1, // 공통 에러 인터셉터 생략
    },
  }).then(({ data }) => data);
