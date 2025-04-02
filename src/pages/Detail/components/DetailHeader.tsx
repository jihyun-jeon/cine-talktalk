import { useGetDetailMovieQuery } from '@/hooks/query/useMovie';
import PosterImage from '@/components/PosterImage';
import { TMDB_LANGUAGE_KR } from '@/contants';
import { getImageUrl } from '@/utils/tmdbUtils';
import clsx from 'clsx';
import { useAuth } from '@/context/AuthContext';
import {
  useAddFavoriteMutation,
  useGetFavoriteByMovieQuery,
  useDeleteFavoriteMutation,
} from '@/hooks/query/useFavorite';
import { useGetVideoQuery } from '@/hooks/query/useVideo';
import useNavigateTo from '@/hooks/routing/useUrlNavigation';
import { PaymentQuery, useGetPayQuery } from '@/hooks/query/usePay';
import { Play, MonitorPlay } from 'lucide-react';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const DetailHeader = ({ movieId }: { movieId: number }) => {
  const queryClient = useQueryClient();
  const goTo = useNavigateTo();
  const { session } = useAuth();
  const userId = session?.user.id;

  const { data: movieInfo } = useGetDetailMovieQuery(movieId, { language: TMDB_LANGUAGE_KR });
  const { data: { key: videoId } = {} } = useGetVideoQuery(movieId);
  const { data: paymentData } = useGetPayQuery(userId!, movieId);
  const { data: favorites } = useGetFavoriteByMovieQuery(movieId!, userId!);

  const addFavorite = useAddFavoriteMutation();
  const deleteFavorite = useDeleteFavoriteMutation();

  const isFavoriteAdded = !!favorites?.length;
  const isPurchased = !!paymentData?.length;

  const handleAddFavorite = () => {
    if (!movieInfo?.title || !movieInfo?.poster_path || !userId) return;

    if (isFavoriteAdded) {
      deleteFavorite.mutate({ userId, movieId });
    } else {
      addFavorite.mutate({
        movie_id: movieId,
        user_id: userId,
        img_url: movieInfo.poster_path,
        title: movieInfo.title,
      });
    }
  };

  const handlePayment = () => {
    const params = new URLSearchParams({
      movieId: movieId.toString(),
      title: movieInfo?.title || '',
      imgUrl: movieInfo?.poster_path || '',
    });

    return window.open(`/payment/checkout?${params}`, '_blank', 'width=770,height=730');
  };

  const goToWatchPage = (videoId: string) => {
    if (!videoId) return;
    return goTo('/watch/:movieId', { movieId }, { play: videoId });
  };

  useEffect(() => {
    const channel = new BroadcastChannel('payment_success');

    channel.onmessage = (event) => {
      if (event.data.type === 'INVALIDATE_QUERIES') {
        queryClient.invalidateQueries({
          queryKey: PaymentQuery.getOne(movieId),
          exact: true,
        });
      }
    };

    return () => channel.close();
  }, [movieId, queryClient]);

  const renderActionButtons = () => (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={handleAddFavorite}
        className="w-[70px] h-[70px] flex flex-col justify-center hover:bg-white/30"
      >
        {isFavoriteAdded ? (
          <>
            <span>✔️</span>
            <span>추가됨</span>
          </>
        ) : (
          <>
            <span>+</span>
            <span>찜하기</span>
          </>
        )}
      </button>
      <button type="button" className="w-[70px] h-[70px] flex flex-col justify-center bg-white-10 hover:bg-white/30">
        <span>✍️</span>
        <span>평가하기</span>
      </button>
      <button type="button" className="w-[70px] h-[70px] flex flex-col justify-center bg-white-10 hover:bg-white/30">
        <span>📎</span>
        <span>공유</span>
      </button>
    </div>
  );

  return (
    <header
      className={clsx('h-96 bg-cover', {
        'bg-center': movieInfo?.backdrop_path,
        'bg-gray-900': !movieInfo?.backdrop_path,
      })}
      style={{
        backgroundImage: movieInfo?.backdrop_path
          ? `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(${getImageUrl(movieInfo.backdrop_path, 'w500')})`
          : 'none',
      }}
    >
      <div className="flex px-36 w-full h-full p-6">
        <div className="relative h-full min-w-[224px] mr-10">
          <PosterImage posterPath={movieInfo?.poster_path} size="w500" />
        </div>

        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between">
            <h1 className="text-2xl">
              {movieInfo?.title} - {movieId}
            </h1>
          </div>

          <div>
            {videoId && (
              <button type="button" onClick={() => goToWatchPage(videoId)}>
                ▶️ 미리보기
              </button>
            )}
          </div>

          <div className="flex align-center gap-1">
            <p className="mb-1">✭ {movieInfo?.vote_average}</p>
            <p className="px-2">•</p>
            <p className="mb-1">{movieInfo?.release_date}</p>
            <p className="px-2">•</p>
            <p className="mb-1">{movieInfo?.genres.map((genre) => <span key={genre.id}>{genre.name} </span>)}</p>
            <p className="px-2">•</p>
            <p className="mb-1">{movieInfo?.runtime}m</p>
          </div>

          <p>{movieInfo?.overview}</p>

          <div className="flex justify-between items-center">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 px-6 py-2 mt-5 rounded-md transition-colors"
              onClick={isPurchased ? () => goToWatchPage(videoId!) : handlePayment}
            >
              {isPurchased ? (
                <div className="flex items-center gap-2">
                  <Play fill="white" />
                  <span className="font-medium">감상하기</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <MonitorPlay />
                  <span className="font-medium">구매하기</span>
                </div>
              )}
            </button>
            {renderActionButtons()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DetailHeader;
