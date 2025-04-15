import { useQuery } from '@tanstack/react-query';
import { fetchVideo } from '@/api/video';

/** 영화 비디오 정보 요청 */
export const useGetVideoQuery = (movieId: number) =>
  useQuery({
    queryFn: () => fetchVideo(movieId),
    queryKey: VideoQueryKeys.getOne(movieId),
  });

export const VideoQueryKeys = {
  all: ['video'],
  getOne: (id: number) => [...VideoQueryKeys.all, 'getOne', id],
};
