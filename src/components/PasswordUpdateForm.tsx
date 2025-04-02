import { ERROR_MESSAGES } from '@/contants';
import { AuthError, User } from '@supabase/supabase-js';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useNavigateTo from '@/hooks/routing/useUrlNavigation';
import { useAuth } from '@/context/AuthContext';

const passwordSchema = z
  .object({
    password: z.string().min(6, '비밀번호는 6자리 이상이어야 합니다.').nonempty('비밀번호를 입력해주세요.').trim(),
    confirmPassword: z
      .string()
      .min(6, '비밀번호는 6자리 이상이어야 합니다.')
      .nonempty('비밀번호 확인을 입력해주세요.')
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

type PasswordFormInputs = z.infer<typeof passwordSchema>;

interface PasswordUpdateFormProps {
  onSubmitFn: (password: string) => Promise<{ user: User }>;
}

const PasswordUpdateForm = ({ onSubmitFn }: PasswordUpdateFormProps) => {
  const [error, setError] = useState<null | AuthError>(null);
  const goTo = useNavigateTo();

  const { signOut } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormInputs>({
    resolver: zodResolver(passwordSchema),
  });

  const handlePasswordSubmit: SubmitHandler<PasswordFormInputs> = async ({ password }) => {
    try {
      await onSubmitFn(password);
      setError(null);
      await signOut();
      alert('비밀번호가 변경되었습니다. 새로 로그인 해주세요.');
      goTo('/login');
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error); // supabase 에러 처리
      } else {
        alert(ERROR_MESSAGES.DEFAULT); // 500 서버 에러, 런타임 에러
        setError(null);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handlePasswordSubmit)} className="flex flex-col max-w-md m-auto pt-24">
      <div className="flex flex-col py-4">
        <input
          {...register('password')}
          type="password"
          maxLength={15}
          placeholder="비밀번호 6~15자 사이"
          className="p-3 mt-2 text-black"
        />
        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
      </div>

      <div className="flex flex-col py-4">
        <input
          {...register('confirmPassword')}
          type="password"
          maxLength={15}
          placeholder="비밀번호 확인"
          className="p-3 mt-2 text-black"
        />
        {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
      </div>

      <button className="w-full mt-4">비밀번호 변경</button>

      {error && <ErrorMessage error={error} />}
    </form>
  );
};

export default PasswordUpdateForm;

const ErrorMessage = ({ error }: { error: AuthError }) => {
  const messages = {
    default: '비밀번호 변경 중 오류가 발생했습니다.',
  };

  return (
    <div className="text-red-600 text-center pt-4">
      <p>{messages[error.code as keyof typeof messages] || messages.default}</p>
    </div>
  );
};
