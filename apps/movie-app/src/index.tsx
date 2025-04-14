import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from '@/App';
import '@/styles/main.css';
import { StrictMode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // 쿼리 실행 오류시, 쿼리요청 재시도 할지여부
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </StrictMode>,
);
