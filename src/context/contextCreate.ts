import { createContext } from "react";
import { FormInstance } from "antd";

export type dataGridTabType = 'detail' | 'edit';
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

export interface DataGridContextProps {
  form: FormInstance | undefined,
  dataGridContainerRef: React.RefObject<HTMLDivElement> | null,
  page: number, 
  setPage: React.Dispatch<React.SetStateAction<number>> | undefined,
  limitPerPage: number,
  setLimitPerPage: React.Dispatch<React.SetStateAction<number>> | undefined,
  searchValue: string,
  setSearchValue: React.Dispatch<React.SetStateAction<string>> | undefined,
  containerSize: { width: number, height: number },
  setContainerSize: React.Dispatch<React.SetStateAction<{ width: number, height: number }>> | undefined,
  activeTabkey: dataGridTabType,
  setActiveTabkey: React.Dispatch<React.SetStateAction<dataGridTabType>> | undefined,
  isActionDrawerOpen: boolean,
  setIsActionDrawerOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined,
  isConfirmModalOpen: boolean,
  setIsConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined,
  isFormChangeDetected: boolean,
  setIsFormChangeDetected: React.Dispatch<React.SetStateAction<boolean>> | undefined,
  isOnMutateData: boolean,
  setIsOnMutateData: React.Dispatch<React.SetStateAction<boolean>> | undefined,
  tableHeight: number,
};

const initialGlobalContextValue: GlobalContextProps = {
  isDarkMode: false,
  setIsDarkMode: () => { },
  language: "",
  setLanguage: () => { },
  openNotification: () => { },
  windowDimension: { width: 0, height: 0 },
  contentContainerRef: null,
};

const initialDataGridContextValue: DataGridContextProps = {
  form: undefined,
  dataGridContainerRef: null,
  page: 1, 
  setPage: () => {},
  limitPerPage: 10,
  setLimitPerPage: () => {},
  searchValue: "",
  setSearchValue: () => {},
  containerSize: { width: 0, height: 0 },
  setContainerSize: () => {},
  activeTabkey: "detail",
  setActiveTabkey: () => {},
  isActionDrawerOpen: false,
  setIsActionDrawerOpen: () => {},
  isConfirmModalOpen: false,
  setIsConfirmModalOpen: () => {},
  isFormChangeDetected: false,
  setIsFormChangeDetected: () => {},
  isOnMutateData: false,
  setIsOnMutateData: () => {},
  tableHeight: 0,
};

export const GlobalContext = createContext<GlobalContextProps>(initialGlobalContextValue);
export const DataGridContext = createContext<DataGridContextProps>(initialDataGridContextValue);