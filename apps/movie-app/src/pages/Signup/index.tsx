import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/AuthForm';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async ({ email, password }: { email: string; password: string }) => {
    await signUp({ email: email, password: password });
    alert('회원가입이 완료되었습니다.');
    navigate('/login');
  };

  return <AuthForm mode="signup" onSubmitFn={handleSignUp} />;
};

export default Signup;
