import ErrorPage from '@/pages/Error';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class AuthErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Something went wrong</h1>
          <ErrorPage />
        </>
      );
    }
    return this.props.children;
  }
}

export default AuthErrorBoundary;

// supabase 오류 처리
