import { Outlet, Link, useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import { useAuth } from '@/context/AuthContext';

const Layout = () => {
  const navigate = useNavigate();
  const { signOut, session } = useAuth();

  const onLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log('Logout error:', error);
    }
    navigate('/movie');
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="bg-gray-800 p-4 fixed w-full top-0">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/movie" className="mr-5 font-bold text-red-500">
                WATCHA
              </Link>
            </div>

            <div className="flex items-center space-x-4 ">
              <SearchBar />
              {session ? (
                <>
                  <button type="button" onClick={onLogout}>
                    로그아웃
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/favorite');
                    }}
                  >
                    찜목록
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/mypage');
                    }}
                  >
                    마이페이지
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-gray-400">
                    로그인
                  </Link>
                  <Link to="/signup" className="bg-red-500 px-3 py-1 rounded-md">
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="mt-16 flex-1">
          <Outlet />
        </main>
        <footer className="h-32 bg-gray-500">footer</footer>
      </div>
    </>
  );
};

export default Layout;
