import { ErrorBoundary } from 'react-error-boundary';
import { Hero, HeroErrorFallback } from '@/pages/Home/components/Hero';
import { DayTop20, DayTop20ErrorFallback } from '@/pages/Home/components/Day20';

const Home = () => (
  <div className="text-white px-36 pt-5">
    {/* Hero */}
    <div className="mb-10">
      <h1 className="text-2xl font-bold mb-4">인기 영화</h1>
      <ErrorBoundary FallbackComponent={HeroErrorFallback}>
        <Hero />
      </ErrorBoundary>
    </div>

    {/* Day Top20 */}
    <div className="mb-10">
      <h1 className="text-2xl font-bold mb-4">오늘의 인기작 TOP 20</h1>
      <ErrorBoundary FallbackComponent={DayTop20ErrorFallback}>
        <DayTop20 />
      </ErrorBoundary>
    </div>
  </div>
);

export default Home;
