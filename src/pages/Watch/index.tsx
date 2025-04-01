import { useState, useRef, useEffect } from 'react';
import { X, Sun, Bookmark, CircleCheck } from 'lucide-react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import usePathParams from '@/hooks/routing/usePathParams';
import useQueryState from '@/hooks/routing/useQueryParams';
import useNavigateTo from '@/hooks/routing/useUrlNavigation';
import clsx from 'clsx';

const Watch = () => {
  const goTo = useNavigateTo();
  const playerRef = useRef<YouTubePlayer | null>(null);

  const [movieId] = usePathParams('movieId', 0);
  const [videoId] = useQueryState<string>('play');

  const [brightness, setBrightness] = useState('1');
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showCheckIcon, setShowCheckIcon] = useState(false);

  const STORAGE_KEY = `bookmarks_${movieId}`;
  const savedBookmarks = () => {
    const savedBookmarks = localStorage.getItem(STORAGE_KEY);
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  };

  const [bookmarks, setBookmarks] = useState<number[]>(savedBookmarks);

  const addBookmark = async () => {
    if (!playerRef.current) return;
    const currentTime = await playerRef.current.getCurrentTime();
    setBookmarks((prev) => [...prev, currentTime]);

    setShowCheckIcon(true);
    setTimeout(() => setShowCheckIcon(false), 1000);
  };

  const deleteBookmark = (index: number) => {
    setBookmarks((prev) => prev.filter((_, i) => i !== index));
  };

  const moveToTimestamp = (time: number) => {
    if (playerRef.current) playerRef.current.seekTo(time, true);
  };

  useEffect(() => {
    // 북마크 저장
    if (!!bookmarks.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...bookmarks]));
    } else {
      localStorage.removeItem(STORAGE_KEY);
      setShowBookmarks(false);
    }
  }, [bookmarks]);

  return (
    <div className="fixed flex flex-col inset-0 w-screen h-screen bg-black p-4">
      <div className="h-12 bg-black flex items-end justify-between pb-4">
        <button type="button" onClick={() => goTo('/movie/:movieId', { movieId })}>
          <X className="w-7 h-7 text-gray-100" />
        </button>

        {/* 밝기 조절 */}
        <div className="flex items-center p-2 rounded-lg text-gray-600 opacity-50 hover:text-white hover:opacity-100 transition-colors duration-200">
          <Sun className="w-5 h-5 mr-4  " />
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            className="w-32 h-2 "
          />
        </div>

        {/* 북마크 추가 버튼 */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={addBookmark}
            className={clsx(
              'flex px-4 py-2 rounded transition-all duration-300 ease-in-out',
              showCheckIcon ? 'border-green-500 text-green-500' : 'border-transparent text-inherit',
            )}
          >
            <CircleCheck
              className={clsx(
                'mr-2 transition-all duration-300 ease-in-out',
                showCheckIcon ? 'text-green-500 opacity-100' : 'text-black opacity-0',
              )}
            />
            <span>북마크 추가</span>
          </button>
          <button type="button" onClick={() => setShowBookmarks(!showBookmarks)} className="text-gray-100">
            <Bookmark className="w-7 h-7" fill={showBookmarks ? 'green' : 'none'} />
          </button>
        </div>
      </div>

      {/* 북마크 목록 */}
      {showBookmarks && (
        <div className="absolute top-16 right-4 bg-gray-800 p-4 rounded-lg w-48 max-h-[80%] overflow-y-auto">
          <h3 className="text-white mb-2">북마크 목록</h3>
          <div className="space-y-2">
            {bookmarks.map((time, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-700 px-4 py-2 rounded">
                <button onClick={() => moveToTimestamp(time)} className="text-white text-sm">
                  {Math.floor(time / 60)}:
                  {Math.floor(time % 60)
                    .toString()
                    .padStart(2, '0')}
                </button>
                <button onClick={() => deleteBookmark(index)} className="text-red-500">
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 유튜브 비디오 */}
      {videoId && (
        <YouTube
          videoId={videoId}
          opts={{
            width: '100%',
            height: '95%',
            playerVars: {
              autoplay: 1,
              rel: 0,
              modestbranding: 1,
              start: 0,
            },
          }}
          onReady={(event) => {
            playerRef.current = event.target;
            event.target.mute();
          }}
          className="w-full mx-auto"
          style={{
            flex: 1,
            filter: `brightness(${brightness})`,
          }}
        />
      )}
    </div>
  );
};

export default Watch;
