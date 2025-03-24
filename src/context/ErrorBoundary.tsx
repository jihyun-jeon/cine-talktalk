import NotFound from '@/pages/NotFound';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
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
          <NotFound errorMessage={'예상치 못한 오류가 발생했어요'} />
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

// supabase 오류 처리
