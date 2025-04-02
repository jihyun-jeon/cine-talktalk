import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Detail from '@/pages/Detail';
import NotFound from '@/pages/Error/NotFound';
import Search from '@/pages/Search';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';
import { useAuth } from '@/context/AuthContext';
import Favorite from '@/pages/Favorite';
import ErrorPage from '@/pages/Error';
import CommonError from '@/interceptor/CommonError';
import Watch from '@/pages/Watch';

/** 인증된 사용자만 접근 가능한 가드 */
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  return session ? children : <Navigate to="/movie" replace />;
};

/** 인증된 사용자의 접근을 막는 가드 */
const RedirectIfAuthenticated = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  return session ? <Navigate to="/movie" replace /> : children;
};

export const router = createBrowserRouter([
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
        path: 'watch/:movieId',
        element: (
          <RequireAuth>
            <Watch />
          </RequireAuth>
        ),
      },
      {
        path: 'login',
        element: (
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: 'signup',
        element: (
          <RedirectIfAuthenticated>
            <Signup />
          </RedirectIfAuthenticated>
        ),
      },
      { path: 'error', element: <ErrorPage /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
