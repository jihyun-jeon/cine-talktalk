import PasswordUpdateForm from '@/components/\bPasswordUpdateForm';
import { useAuth } from '@/context/AuthContext';
import useNavigateTo from '@/hooks/routing/useUrlNavigation';
import { ArrowLeft } from 'lucide-react';

const UpdateProfile = () => {
  const { updateUser } = useAuth();
  const goTo = useNavigateTo();
  return (
    <>
      <button onClick={() => goTo('/mypage')} className="fixed left-4 top-4 flex">
        <ArrowLeft className="mr-2" /> <span> 마이페이지로 돌아가기</span>
      </button>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="w-96">
          <PasswordUpdateForm onSubmitFn={updateUser} />
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
