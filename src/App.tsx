import { theme } from 'antd';
import { MainRoutes } from './routes/MainRoutes'
import { useEffect } from 'react';

function App() {

  const {
    token: {
      boxShadow,
      colorText,
      colorPrimary,
      colorPrimaryBgHover,
      colorPrimaryBg,
      colorPrimaryText,
      borderRadiusLG,
      colorBgElevated,
      colorBgTextHover,
      colorBgContainer,
    },
  } = theme.useToken();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--clrText', colorText);
    root.style.setProperty('--boxShadow', boxShadow);
    root.style.setProperty('--clrPrimary', colorPrimary);
    root.style.setProperty('--clrPrimaryBG', colorPrimaryBg);
    root.style.setProperty('--clrPrimaryBGHov', colorPrimaryBgHover);
    root.style.setProperty('--clrPrimaryText', colorPrimaryText);
    root.style.setProperty('--clrBGElevated', colorBgElevated);
    root.style.setProperty('--clrBGTextHover', colorBgTextHover);
    root.style.setProperty('--clrBGContainer', colorBgContainer);
    root.style.setProperty('--borderRadusLG', `${borderRadiusLG}px`);
  }, [
    colorText, 
    colorPrimary,
    colorPrimaryBg,
    colorPrimaryText,
    colorPrimaryBgHover,
    colorBgTextHover, 
    colorBgElevated, 
    boxShadow, 
    borderRadiusLG, 
    colorBgContainer,
  ]);

  return (
    <MainRoutes />
  )
}

export default App