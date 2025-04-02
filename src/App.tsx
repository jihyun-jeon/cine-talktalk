import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { AuthContextProvider } from '@/context/AuthContext';
import SpinnerPortal from '@/components/Spinner';
import AuthErrorBoundary from '@/context/AuthErrorBoundary';

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
