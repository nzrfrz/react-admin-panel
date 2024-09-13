import ReactDOM from 'react-dom/client'
import { 
  BrowserRouter, 
  Routes, 
  Route, 
} from "react-router-dom";
import { GlobalContextProvider } from './context/GlobalContextProvider.tsx';

import App from './App.tsx'

import './index.css'
import 'antd/dist/reset.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GlobalContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </BrowserRouter>
  </GlobalContextProvider>,
)
