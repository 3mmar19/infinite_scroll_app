import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { worker } from './mocks/browser';

//---------------------------- React Query Configuration ------------------------------
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,       // Data stays fresh for 5 minutes
      gcTime: 10 * 60 * 1000,         // Cache kept for 10 minutes
      retry: 1,                       // Retry failed requests once
      refetchOnWindowFocus: false,    // Don't refetch when window regains focus
    },
  },
});

//---------------------------- Start MSW (Mock Service Worker) ------------------------------
worker.start({
  onUnhandledRequest: 'bypass',
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
