import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Detail from '@/pages/Detail';
import NotFound from '@/pages/Error/NotFound';
import Search from '@/pages/Search';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';
import { AuthContextProvider, useAuth } from '@/context/AuthContext';
import Favorite from '@/pages/Favorite';
import SpinnerPortal from '@/components/Spinner';
import AuthErrorBoundary from '@/context/AuthErrorBoundary';
import ErrorPage from '@/pages/Error';
import CommonError from '@/interceptor/CommonError';

const GuardRouter = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  return session ? <Navigate to="/movie" replace /> : children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <CommonError />
        <Layout />
      </>
    ),
    children: [
      { index: true, element: <Navigate to="/movie" replace /> },
      { path: 'movie', element: <Home /> },
      { path: 'movie/:movieId', element: <Detail /> },
      { path: 'search', element: <Search /> },
      { path: 'favorite', element: <Favorite /> },
      {
        path: 'login',
        element: (
          <GuardRouter>
            <Login />
          </GuardRouter>
        ),
      },
      {
        path: 'signup',
        element: (
          <GuardRouter>
            <Signup />
          </GuardRouter>
        ),
      },
      { path: 'error', element: <ErrorPage /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

function App() {
  return (
    <AuthErrorBoundary>
      <Suspense fallback={<SpinnerPortal />}>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </Suspense>
    </AuthErrorBoundary>
  );
}

export default App;
