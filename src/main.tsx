import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { GlobalContextProvider } from './context/GlobalContextProvider.tsx';

import App from './App.tsx'

import './index.css'
import 'antd/dist/reset.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  </QueryClientProvider>
)
