import React, { useState, useEffect, useRef } from 'react';

interface CarouselProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  itemsPerPage?: number;
}

const TRANSITION_DURATION = 300;

const Carousel: React.FC<CarouselProps> = ({
  children,
  autoPlay = false,
  showIndicators = false,
  showArrows = true,
  itemsPerPage = 5,
  interval = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(itemsPerPage);
  const isTransitioning = useRef(false);

  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const extendedItems = [
    ...childrenArray.slice(-itemsPerPage), // 마지막 페이지의 아이템들
    ...childrenArray,
    ...childrenArray.slice(0, itemsPerPage), // 첫 페이지의 아이템들
  ];

  const goToNext = () => {
    if (!isTransitioning.current) {
      isTransitioning.current = true;
      setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
    }
  };

  const goToPrev = () => {
    if (!isTransitioning.current) {
      isTransitioning.current = true;
      setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
    }
  };

  const goToSlide = (pageIndex: number) => {
    if (!isTransitioning.current && pageIndex !== currentIndex) {
      isTransitioning.current = true;
      setCurrentIndex(pageIndex * itemsPerPage);
    }
  };

  useEffect(() => {
    if (isTransitioning.current) {
      const timer = setTimeout(() => {
        isTransitioning.current = false; // 애니메이션이 완료된 300ms 후에, 캐러셀 이동 허용

        if (currentIndex >= totalItems + itemsPerPage) {
          setCurrentIndex(itemsPerPage); // 마지막 페이지에서 첫 번째 페이지로 자연스럽게 이동
        } else if (currentIndex < itemsPerPage) {
          setCurrentIndex(totalItems); // 첫 페이지에서 마지막 페이지로 자연스럽게 이동
        }
      }, TRANSITION_DURATION);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, totalItems, itemsPerPage]);

  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (autoPlay) {
      autoPlayTimerRef.current = setInterval(goToNext, interval);

      return () => {
        if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      };
    }
  }, [autoPlay, interval]);

  const getTransform = () => `translateX(-${currentIndex * (100 / itemsPerPage)}%)`;

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform ease-in-out"
        style={{
          transform: getTransform(),
          transition: isTransitioning.current ? `${TRANSITION_DURATION}ms` : 'none',
        }}
      >
        {extendedItems.map((item, idx) => (
          <div key={idx} className="flex-shrink-0" style={{ width: `${100 / itemsPerPage}%` }}>
            {item}
          </div>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
            aria-label="이전 슬라이드"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
            aria-label="다음 슬라이드"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}

      {showIndicators && totalPages > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                Math.floor((currentIndex - itemsPerPage) / itemsPerPage) === index ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
