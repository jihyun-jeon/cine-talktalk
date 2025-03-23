import { useMutation, useQuery, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { addFavorite, deleteFavorite, fetchFavorites, fetchFavoritesByMovie } from '@/api/favorite';
import { FavoriteData, FavoriteSearchParams } from '@/types/favorite';

/** 즐겨찾기 조회  */
export const useGetFavoriteQuery = () =>
  useQuery({
    queryFn: fetchFavorites,
    queryKey: FavoriteQuery.all,
  });

/**  특정 영화별 사용자 즐겨찾기에 추가된 리스트 조회 */
export const useGetFavoriteByMovieQuery = (movieId: number, userId: string) =>
  useQuery({
    queryFn: () => fetchFavoritesByMovie({ movieId, userId }),
    queryKey: FavoriteQuery.all,
    enabled: !!movieId && !!userId,
  });

/** 즐겨찾기 추가 */
export const useAddFavoriteMutation = (options?: UseMutationOptions<null, Error, FavoriteData>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavorite,
    onSuccess: (data, variables, context) => {
      alert('찜 추가 완료!');
      queryClient.invalidateQueries({ queryKey: FavoriteQuery.all });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error('error', error);
      options?.onError?.(error, variables, context);
    },
  });
};

/** 즐겨찾기 삭제  */
export const useDeleteFavoriteMutation = (options?: UseMutationOptions<null, Error, FavoriteSearchParams>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFavorite,
    onSuccess: (data, variables, context) => {
      alert('찜 삭제 완료!');
      queryClient.invalidateQueries({ queryKey: FavoriteQuery.all });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error('error', error);
      options?.onError?.(error, variables, context);
    },
  });
};

export const FavoriteQuery = {
  all: ['favorite'],
};
