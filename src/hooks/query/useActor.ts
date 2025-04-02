import { useQuery } from '@tanstack/react-query';
import { baseSearchParam } from '@/types/movieType';
import { fetchCredit } from '@/api/actor';

/** 영화 크레딧 정보 요청 */
export const useGetCreditQuery = (movieId: number, queryParams: baseSearchParam) =>
  useQuery({
    queryFn: () => fetchCredit(movieId, queryParams),
    queryKey: ActorQueryKeys.getOne(movieId),
  });

export const ActorQueryKeys = {
  all: ['actor'],
  getOne: (movieId: number) => [...ActorQueryKeys.all, 'getOne', movieId],
};
