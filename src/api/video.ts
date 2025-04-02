import axiosInstance from '@/api/axios';
import { VideoResponse } from '@/types/video';

/** 영화 비디오 정보 요청 */
export const fetchVideo = (movieId: number) =>
  axiosInstance<VideoResponse>({
    url: `/movie/${movieId}/videos`,
    method: 'get',
  }).then(({ data }) => data.results[0]);
