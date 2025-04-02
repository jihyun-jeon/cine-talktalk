import { useLocation, useNavigate } from 'react-router-dom';

/** 다양한 타입의 URL 쿼리 파라미터를 상태처럼 사용하는 훅 */
const useQueryState = <T extends string | number | boolean>(key: string, defaultValue?: T) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const queryParams = new URLSearchParams(search);

  // 조회
  let currentValue: T;

  const paramValue = queryParams.get(key);

  if (!paramValue) {
    currentValue = defaultValue as T;
  } else if (typeof paramValue === 'number') {
    currentValue = Number(paramValue) as T;
  } else if (typeof paramValue === 'boolean') {
    currentValue = (paramValue === 'true') as T;
  } else {
    currentValue = paramValue as T;
  }

  // 업데이트
  const updateSearchParams = (newParams: Record<string, string>) => {
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        queryParams.set(key, value);
      } else {
        queryParams.delete(key);
      }
    });
  };

  const setValue = (newValue: T) => {
    updateSearchParams({ [key]: String(newValue) });
    navigate({
      pathname,
      search: queryParams.toString(),
    });
  };

  return [currentValue, setValue] as const;
};

export default useQueryState;
