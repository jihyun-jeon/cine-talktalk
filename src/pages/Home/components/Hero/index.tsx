import { usePopularMoviesQuery } from '@/hooks/query/useMovie';
import { TMDB_LANGUAGE_KR } from '@/contants';
import useNavigateToContents from '@/hooks/usePathParams';
import { Movie } from '@/types/movieType';
import Carousel from '@/components/Carousel';

export const Hero = () => {
  const popularMovies = usePopularMoviesQuery({ language: TMDB_LANGUAGE_KR, page: 1 });

  const { updatePathParam } = useNavigateToContents();

  return (
    <>
      {popularMovies.isLoading ? (
        <div>Loading...</div>
      ) : (
        <Carousel autoPlay={true} showIndicators={true} showArrows={true} itemsPerPage={1} interval={3000}>
          {popularMovies.data?.results.slice(0, 5).map((movie: Movie) => (
            <div
              key={movie.id}
              className="relative  w-full  h-[400px] cursor-pointer"
              onClick={() => updatePathParam('.', movie.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-10 left-10 z-20">
                <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
                <p className="text-gray-300 line-clamp-2 max-w-2xl">{movie.overview}</p>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
};

//  에러 UI 컴포넌트
export const HeroErrorFallback = ({ error }: { error: Error }) => (
  <div className="relative  w-full  h-[400px] cursor-pointer">
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
    <img src="/asset/heroError.jpg" className="w-full h-full object-cover" />
    <div className="absolute bottom-10 left-10 z-20"></div>
  </div>
);
