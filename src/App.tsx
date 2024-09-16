import { theme } from 'antd';
import { MainRoutes } from './routes/MainRoutes'
import { useEffect } from 'react';

function App() {

  const {
    token: {
      boxShadow,
      colorText,
      colorBgElevated,
      colorBgTextHover,
    },
  } = theme.useToken();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--clrText', colorText);
    root.style.setProperty('--boxShadow', boxShadow);
    root.style.setProperty('--clrBGElevated', colorBgElevated);
    root.style.setProperty('--clrBGTextHover', colorBgTextHover);
  }, [colorText, colorBgTextHover, colorBgElevated, boxShadow]);

  return (
    <MainRoutes />
  )
}

export default App