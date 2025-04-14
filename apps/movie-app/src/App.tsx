import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { AuthContextProvider } from '@/context/AuthContext';
import SpinnerPortal from '@repo/ui/Spinner';
import AuthErrorBoundary from '@/context/AuthErrorBoundary';

import { Button } from '@repo/ui/button';

function App() {
  return (
    <AuthErrorBoundary>
      <Suspense fallback={<SpinnerPortal />}>
        <AuthContextProvider>
          <Button appName="movie-app">클릭!</Button>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </Suspense>
    </AuthErrorBoundary>
  );
}

export default App;
