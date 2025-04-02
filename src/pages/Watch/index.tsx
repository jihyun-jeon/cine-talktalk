import usePathParams from '@/hooks/routing/usePathParams';
import useQueryState from '@/hooks/routing/useQueryParams';
import useNavigateTo from '@/hooks/routing/useUrlNavigation';
import { X } from 'lucide-react';

const Watch = () => {
  const goTo = useNavigateTo();

  const [movieId, setMovieId] = usePathParams('movieId', 0);
  const [videoId, setVideoId] = useQueryState<string>('play');

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black px-6">
      <div className="h-12 bg-black flex items-end">
        <button
          type="button"
          onClick={() => {
            goTo('/movie/:movieId', { movieId });
          }}
        >
          <X className="w-7 h-7 text-gray-100" />
        </button>
      </div>
      {videoId && (
        <iframe
          width="100%"
          style={{ height: 'calc(100% - 70px)' }}
          src={`https://www.youtube.com/embed/${videoId}`}
          className="border-0 "
          allowFullScreen
        ></iframe>
      )}
      <div className="h-5"></div>
    </div>
  );
};

export default Watch;
