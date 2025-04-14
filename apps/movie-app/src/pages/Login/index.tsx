import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/AuthForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async ({ email, password }: { email: string; password: string }) => {
    await signIn({ email: email, password: password });
    navigate('/');
  };

  return <AuthForm mode="login" onSubmitFn={handleSignIn} />;
};

export default Login;
