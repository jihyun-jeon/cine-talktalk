import { useGetFavoriteQuery, useDeleteFavoriteMutation } from '@/hooks/query/useFavorite';
import PosterImage from '@/components/PosterImage';
import { useAuth } from '@/context/AuthContext';

const Favorite = () => {
  const favorites = useGetFavoriteQuery();
  const deleteCommnet = useDeleteFavoriteMutation();

  const getUser = useAuth();
  const userId = getUser.session?.user.id;

  const onFavoriteDelete = (movieId: number | null) => {
    if (!userId || !movieId) {
      return;
    }

    deleteCommnet.mutate({ userId, movieId });
  };

  return (
    <div>
      Favorite
      <ul className="flex">
        {favorites.data?.map((favorite) => (
          <li key={favorite.id}>
            {favorite.title}
            <div className="relative w-40" onClick={() => onFavoriteDelete(favorite.movie_id)}>
              <PosterImage posterPath={favorite.img_url} size={'w500'} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorite;
