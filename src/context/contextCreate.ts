import { createContext } from "react";

export type notificationType = 'success' | 'info' | 'warning' | 'error';

export type windowDimensionData = { width: number, height: number };

export interface GlobalContextProps {
    isDarkMode: boolean,
    setIsDarkMode: (isDarkMode: boolean) => void,
    language: string,
    setLanguage: (language: string) => void,
    windowDimension: windowDimensionData, 
    openNotification: (type: notificationType, key: string, message: string, description: string) => void,
    contentContainerRef?: React.RefObject<HTMLDivElement> | null,
};

const initialGlobalContextValue: GlobalContextProps = {
    isDarkMode: false,
    setIsDarkMode: () => {},
    language: "",
    setLanguage: () => {},
    openNotification: () => {},
    windowDimension: { width: 0, height: 0 },
    contentContainerRef: null,
};

export const GlobalContext = createContext<GlobalContextProps>(initialGlobalContextValue);