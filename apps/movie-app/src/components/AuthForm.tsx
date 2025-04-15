import { ERROR_MESSAGES } from '@/contants';
import { AuthError } from '@supabase/supabase-js';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

const authSchema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요.').nonempty('이메일을 입력해주세요.'),
  password: z.string().min(6, '비밀번호는 6자리 이상이어야 합니다.').nonempty('비밀번호를 입력해주세요.').trim(),
});

type AuthFormInputs = z.infer<typeof authSchema>;

interface AuthFormProps {
  mode: 'login' | 'signup';
  onSubmitFn: (data: { email: string; password: string }) => Promise<void>;
}

const AuthForm = ({ mode, onSubmitFn }: AuthFormProps) => {
  const [error, setError] = useState<null | AuthError>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    resolver: zodResolver(authSchema),
  });

  const handleAuthSubmit: SubmitHandler<AuthFormInputs> = async ({ email, password }) => {
    try {
      await onSubmitFn({ email, password });
      setError(null);
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error); // supabase 에러 처리
      } else {
        alert(ERROR_MESSAGES.DEFAULT); // 500 서버 에러, 런타임 에러
        setError(null);
      }
    }
  };

  const actionText = mode === 'signup' ? '회원가입' : '로그인';
  const linkText = mode === 'signup' ? 'Already have an account? ' : "Don't have an account yet? ";
  const linkInfo = mode === 'signup' ? { url: '/login', name: '로그인' } : { url: '/signup', name: '회원가입' };

  return (
    <form onSubmit={handleSubmit(handleAuthSubmit)} className="flex flex-col max-w-md m-auto pt-24">
      <p>
        {linkText}
        <Link to={linkInfo.url}>{linkInfo.name}</Link>
      </p>

      <div className="flex flex-col py-4">
        <input {...register('email')} placeholder="이메일을 입력하세요" className="p-3 mt-2 text-black" />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </div>

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

      <button className="w-full mt-4">{actionText}</button>

      {error && <ErrorMessage error={error} />}
    </form>
  );
};

export default AuthForm;

const ErrorMessage = ({ error }: { error: AuthError }) => {
  const messages = {
    default: '이메일 또는 비밀번호를 확인해주세요',
    user_already_exists: '이미 사용중인 이메일입니다.',
  };

  return (
    <div className="text-red-600 text-center pt-4">
      <p>{messages[error.code as keyof typeof messages] || messages.default}</p>
    </div>
  );
};
