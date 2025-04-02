import { SetStateAction, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useDebounce from '@/hooks/useDebounce';
import useQueryState from '@/hooks/routing/useQueryParams';

const SearchBar = () => {
  const { pathname } = useLocation();
  const isSearchPage = pathname.includes('search');

  const [queryParam, setQueryParam] = useQueryState<string>('query');

  const [keyword, setKeyword] = useState(queryParam);
  const debouncedKeyword = useDebounce(keyword, 500);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    setQueryParam(debouncedKeyword);
  }, [debouncedKeyword]);

  return (
    <>
      {!isSearchPage ? (
        <Link
          to="/search"
          className="flex items-center rounded px-3 py-1 text-xs  bg-[#36383d] opacity-80 text-[#84868d]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="25"
            fill="none"
            viewBox="0 0 25 25"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M16.17 16.43a7.5 7.5 0 1 1 .26-.26 1 1 0 0 0-.26.26m.64 1.44a9 9 0 1 1 1.06-1.06l3.88 3.88a.75.75 0 1 1-1.06 1.06z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>장르별 콘텐츠를 추천해드릴게요!</div>
        </Link>
      ) : (
        <input
          type="text"
          value={keyword}
          onChange={handleChange}
          placeholder="검색어를 입력하세요"
          className="flex items-center rounded px-2 py-1 text-xs  bg-[#36383d] opacity-80 text-white focus:outline-none focus:ring-1 focus:ring-red-400"
        />
      )}
    </>
  );
};

export default SearchBar;
