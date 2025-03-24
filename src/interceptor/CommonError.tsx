import { useEffect } from 'react';
import axiosInstance from '@/api/axios';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const CommonError = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const id = axiosInstance.interceptors.response.use(undefined, (error) => {
      if (!isAxiosError(error)) {
        return Promise.reject(error);
      }

      if (error.config?.headers.has(CommonError.SKIP)) {
        return Promise.reject(error);
      }

      const status = error.response?.status;
      const errorMessage = status ? COMMON_ERROR_MESSAGE[status] : COMMON_ERROR_MESSAGE.default;

      if (status === 422) {
        alert(errorMessage);
      } else if (status === 500 || !status) {
        navigate('/error');
      }

      return Promise.reject(error);
    });

    return () => {
      axiosInstance.interceptors.response.eject(id);
    };
  }, []);

  return <></>;
};

CommonError.SKIP = 'SKIP_COMMON_ERROR';

export default CommonError;

const COMMON_ERROR_MESSAGE: Record<number, string> & { default: string } = {
  default: '예상치 못한 오류가 발생했어요',
  422: '요청이 잘못되었습니다.', // 사용자 값 잘못입력
};
