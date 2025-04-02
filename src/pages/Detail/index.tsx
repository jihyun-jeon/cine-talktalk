import { TMDB_LANGUAGE_KR } from '@/contants';
import { getImageUrl } from '@/utils/tmdbUtils';
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';
import { useEffect, useState } from 'react';
import usePathParams from '@/hooks/routing/usePathParams';
import '@/styles/custom.css';
import { useGetCreditQuery } from '@/hooks/query/useActor';
import DetailHeader from '@/pages/Detail/components/DetailHeader';
import Comments from '@/pages/Detail/components/Comments';
import clsx from 'clsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from '@/pages/Error';
import Similar from '@/pages/Detail/components/Similar';

export default function Detail() {
  const [mode, setMode] = useState('info');
  const [movieId, setPathParam] = usePathParams('movieId', 0);

  const credit = useGetCreditQuery(movieId, { language: TMDB_LANGUAGE_KR });

  useEffect(() => {
    setMode('info');
  }, [movieId]);

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <DetailHeader movieId={movieId} />
        <main className="px-36">
          {/* 토글버튼 */}
          <div className="pt-3 flex justify-center">
            <ToggleGroup
              type="single"
              value={`${mode}`}
              onValueChange={(v) => {
                setMode(v);
              }}
              aria-label="Genre selection"
              className="flex flex-wrap gap-2"
            >
              {CONTENTS_TAPS.map((data) => (
                <ToggleGroupItem
                  value={data.value}
                  key={data.value}
                  className={clsx(
                    'flex-none mr-1 py-2 px-4 rounded-lg transition-colors duration-200 border text-[#84868d]',
                    {
                      'bg-white border-white': mode?.includes(data.value),
                      'bg-black border-[#84868d]': !mode?.includes(data.value),
                    },
                  )}
                >
                  {data.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          {/* 출연진 */}
          {mode === 'info' && (
            <>
              <div className="py-5">
                <h2 className="font-semibold">감독/출연진</h2>

                <ul className="grid grid-cols-2 gap-4 mt-5">
                  {credit.data?.cast.slice(0, 10).map((data) => (
                    <li key={data.credit_id} className="flex">
                      <div className="w-16">
                        {data.profile_path && <img src={getImageUrl(data.profile_path, 'w342')} className="w-full" />}
                      </div>
                      <div className="flex flex-col justify-center ml-2">
                        <p className="py-1"> {data.name}</p>
                        <p className="py-1"> {data.character}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="py-5">
                <h2 className="font-semibold">사용자 리뷰</h2>
                <Comments movieId={movieId} />
              </div>
            </>
          )}

          {/* 관련 영화 */}
          {mode === 'related' && <Similar movieId={movieId} setPathParam={setPathParam} />}
        </main>
      </ErrorBoundary>
    </>
  );
}

const CONTENTS_TAPS = [
  { name: '콘텐츠 정보', value: 'info' },
  { name: '관련 콘텐츠', value: 'related' },
];
