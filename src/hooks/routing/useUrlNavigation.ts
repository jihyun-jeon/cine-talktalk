import { useNavigate } from 'react-router-dom';

const useNavigateTo = () => {
  const navigate = useNavigate();

  return (
    pathTemplate: string,
    params: Record<string, string | number> = {},
    query: Record<string, string | number> = {},
  ) => {
    // 패스 파라미터
    const path = pathTemplate.replace(/:(\w+)/g, (_, key) => String(params[key]));

    //  쿼리 파라미터
    const searchParams = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });

    const fullPath = searchParams.toString() ? `${path}?${searchParams.toString()}` : path;
    navigate(fullPath);
  };
};

export default useNavigateTo;

// goTo('/favorite');
// goTo('/movie/:movieId', { movieId: movie.id }); // /movie/${movie.id}
// goTo('./:movieId', { movieId: movie.id }); // ./${movie.id}
// goTo('/watch/:movieId', { movieId }, { play: videoId }); // /watch/${movieId}?play=${videoId}
