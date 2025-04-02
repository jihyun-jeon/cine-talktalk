import { useTrendingMoviesQuery } from '@/hooks/query/useMovie';
import PosterImage from '@/components/PosterImage';
import { TMDB_LANGUAGE_KR } from '@/contants';
import { useNavigate } from 'react-router-dom';
import { Movie } from '@/types/movieType';
import Carousel from '@/components/Carousel';

export const DayTop20 = () => {
  const trandingMovies = useTrendingMoviesQuery({ language: TMDB_LANGUAGE_KR, page: 1 });
  const navigate = useNavigate();

  return (
    <>
      {trandingMovies.isLoading ? (
        <div>Loading...</div>
      ) : (
        <Carousel autoPlay={false} showIndicators={false} showArrows={true} itemsPerPage={5}>
          {trandingMovies.data?.results.map((movie: Movie) => (
            <div
              key={movie.id}
              className="w-full px-2 cursor-pointer"
              onClick={() => {
                navigate(`./${movie.id}`);
              }}
            >
              <div className="relative">
                <PosterImage posterPath={movie?.poster_path} size="w342" />
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
};

//  에러 UI 컴포넌트
export const DayTop20ErrorFallback = ({ error }: { error: Error }) => (
  <Carousel autoPlay={false} showIndicators={false} showArrows={true} itemsPerPage={5}>
    {[...Array(5)].map((_, index) => (
      <div key={index} className="w-1/5 px-2 cursor-pointer">
        <div className="relative min-h-[200px]">
          <PosterImage posterPath={null} size="w342" />
        </div>
      </div>
    ))}
  </Carousel>
);
