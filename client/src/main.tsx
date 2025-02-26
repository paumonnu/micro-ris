import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './tailwind.css';
import App from './app/App.tsx';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import queryClient from './react-query/api-client.ts';

const queryClient: QueryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>,
);
