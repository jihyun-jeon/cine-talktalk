import { useNavigate, useParams } from 'react-router-dom';

/** 패스 파라미터를 상태처럼 사용하는 훅 */
const usePathParams = <T extends string | number | boolean>(name: string, defaultValue: T) => {
  const navigate = useNavigate();
  const params = useParams();

  const value = (() => {
    const paramValue = params[name];
    if (!paramValue) return defaultValue;

    if (typeof defaultValue === 'number') {
      return Number(paramValue) as T;
    }
    if (typeof defaultValue === 'boolean') {
      return (paramValue === 'true') as T;
    }

    return paramValue as T;
  })();

  const setValue = (newValue: unknown) => {
    let newPath;
    if (newValue) {
      newPath = window.location.pathname.replace(new RegExp(`/${params[name]}(?=/|$)`), `/${newValue}`);
    } else {
      newPath = window.location.pathname.replace(new RegExp(`/${params[name]}(?=/|$)`), '');
    }
    navigate(newPath);
  };

  return [value, setValue] as const;
};

export default usePathParams;
