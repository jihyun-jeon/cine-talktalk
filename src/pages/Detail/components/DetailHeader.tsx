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

const DetailHeader = ({ movieId }: { movieId: number }) => {
  const movieInfo = useGetDetailMovieQuery(movieId, { language: TMDB_LANGUAGE_KR });

  const getUser = useAuth();
  const userId = getUser.session?.user.id;

  const addFavorite = useAddFavoriteMutation();
  const deleteCommnet = useDeleteFavoriteMutation();

  const { data: favorites } = useGetFavoriteByMovieQuery(movieId!, userId!);
  const isFavoriteAdded = !!favorites?.length;

  const handleAddFavorite = () => {
    const movieData = movieInfo.data;
    if (!movieData?.title || !movieData?.poster_path || !userId) {
      return;
    }

    if (isFavoriteAdded) {
      deleteCommnet.mutate({ userId, movieId });
    } else {
      addFavorite.mutate({
        movie_id: movieId,
        user_id: userId,
        img_url: movieData.poster_path,
        title: movieData.title,
      });
    }
  };

  return (
    <header
      className={clsx('h-96 bg-cover', {
        'bg-center': movieInfo.data?.backdrop_path,
        'bg-gray-900': !movieInfo.data?.backdrop_path,
      })}
      style={{
        backgroundImage: movieInfo.data?.backdrop_path
          ? `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(${getImageUrl(movieInfo.data?.backdrop_path, 'w500')})`
          : 'none',
      }}
    >
      <div className="flex px-36 w-full h-full p-6">
        <div className="h-full min-w-[224px] mr-10">
          <PosterImage posterPath={movieInfo.data?.poster_path} size="w500" />
        </div>

        <div className="flex flex-col justify-between w-full">
          <div>
            <div className="flex justify-between mb-4">
              <h1 className="text-2xl">
                {movieInfo.data?.title} - {movieId}
              </h1>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAddFavorite}
                  className={'w-[70px] h-[70px] flex flex-col justify-center hover:bg-white/30'}
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
                <button
                  type="button"
                  className="w-[70px] h-[70px] flex flex-col justify-center bg-white-10 hover:bg-white/30"
                >
                  <span>✍️</span>
                  <span>평가하기</span>
                </button>
                <button
                  type="button"
                  className="w-[70px] h-[70px] flex flex-col justify-center bg-white-10 hover:bg-white/30"
                >
                  <span>📎</span>
                  <span>공유</span>
                </button>
              </div>
            </div>

            <p className="mb-1">평점: {movieInfo.data?.vote_average}</p>
            <p className="mb-1">개봉일: {movieInfo.data?.release_date}</p>
            <p className="mb-1">
              장르: {movieInfo.data?.genres.map((genre) => <span key={genre.id}>{genre.name} </span>)}
            </p>
            <p className="mb-1">러닝타임: {movieInfo.data?.runtime}m</p>
            <p>{movieInfo.data?.overview}</p>
          </div>

          <button type="button" className="bg-red-500 p-2 mt-2 rounded-sm">
            이용권 구독하기
          </button>
        </div>
      </div>
    </header>
  );
};

export default DetailHeader;
