import { createContext } from "react";

import { FormInstance } from "antd";
import { InfiniteData, UseInfiniteQueryResult, UseQueryResult } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse, FnBProps, PaginatedMetaProps } from "../../../../_utils";

export interface FilterOptionProps {
  key: string | number,
  title: string,
  value: string,
  isSelected: boolean,
};

export interface FnbContextProps {
  form: FormInstance | undefined,
  dataGridContainerRef: React.RefObject<HTMLDivElement> | null,

  containerSize: { width: number, height: number },
  setContainerSize: React.Dispatch<React.SetStateAction<{ width: number, height: number }>> | undefined,
  displayContentType: "List" | "Grid" | string,
  setDisplayContentType: React.Dispatch<React.SetStateAction<"List" | "Grid" | string>> | undefined,

  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>> | undefined,
  limitPerPage: number,
  setLimitPerPage: React.Dispatch<React.SetStateAction<number>> | undefined,
  searchValue: string,
  setSearchValue: React.Dispatch<React.SetStateAction<string>> | undefined,

  isDetailDrawerOpen: boolean,
  setIsDetailDrawerOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined,
  isFormDrawerOpen: boolean,
  setIsFormDrawerOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined,
  formMode: "add" | "edit" | undefined,
  setFormMode: React.Dispatch<React.SetStateAction<"add" | "edit" | undefined>> | undefined,

  modalDeleteConfirmOpen: boolean,
  setModalDeleteConfirmOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined,
  modalFormConfirmOpen: boolean,
  setModalFormConfirmOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined,

  selectedRowData: FnBProps | undefined,
  setSelectedRowData: React.Dispatch<React.SetStateAction<FnBProps | undefined>> | undefined,

  fnbFilterMenuOpen: boolean,
  setFnbFilterMenuOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined,
  dateFilterOptions: FilterOptionProps[] | undefined,
  setDateFilterOptions: React.Dispatch<React.SetStateAction<FilterOptionProps[] | undefined>> | undefined,
  priceFilterOptions: FilterOptionProps[] | undefined,
  setPriceFilterOptions: React.Dispatch<React.SetStateAction<FilterOptionProps[] | undefined>> | undefined,
  statusFilterOptions: FilterOptionProps[] | undefined,
  setStatusFilterOptions: React.Dispatch<React.SetStateAction<FilterOptionProps[] | undefined>> | undefined,
  selectedCategoriesFilterOption: string, 
  setSelectedCategoriesFilterOption: React.Dispatch<React.SetStateAction<string>> | undefined,

  fnbList: UseQueryResult<ApiSuccessResponse<{ meta: PaginatedMetaProps; itemList: FnBProps[] }>> | undefined;
  infiniteFnbList: UseInfiniteQueryResult<InfiniteData<ApiSuccessResponse<{ meta: PaginatedMetaProps; itemList: FnBProps[] }>>, ApiErrorResponse> | undefined;
  tableHeight: number,
  onClickActionMenu: (rowData?: FnBProps | undefined) => void,
  onCLickAdd: () => void,
  onCLickEdit: () => void,
  onCloseDrawerForm: () => void,
  selectedFilterStatus: string,
  selectedPriceFilter: string,
};

const initialFnBContextValue: FnbContextProps = {
  form: undefined,
  dataGridContainerRef: null,

  containerSize: { width: 0, height: 0 },
  setContainerSize: () => { },
  displayContentType: "list",
  setDisplayContentType: () => { },

  page: 1,
  setPage: () => { },
  limitPerPage: 10,
  setLimitPerPage: () => { },
  searchValue: "",
  setSearchValue: () => { },

  isDetailDrawerOpen: false,
  setIsDetailDrawerOpen: () => { },
  isFormDrawerOpen: false,
  setIsFormDrawerOpen: () => { },
  formMode: undefined,
  setFormMode: () => { },

  modalDeleteConfirmOpen: false,
  setModalDeleteConfirmOpen: () => { },
  modalFormConfirmOpen: false,
  setModalFormConfirmOpen: () => { },

  selectedRowData: undefined,
  setSelectedRowData: () => { },

  fnbFilterMenuOpen: false,
  setFnbFilterMenuOpen: () => { },
  dateFilterOptions: undefined,
  setDateFilterOptions: () => { },
  priceFilterOptions: undefined,
  setPriceFilterOptions: () => { },
  statusFilterOptions: undefined,
  setStatusFilterOptions: () => { },
  selectedCategoriesFilterOption: "", 
  setSelectedCategoriesFilterOption: () => { },

  fnbList: undefined,
  infiniteFnbList: undefined,
  tableHeight: 0,
  onClickActionMenu: () => { },
  onCLickAdd: () => { },
  onCLickEdit: () => { },
  onCloseDrawerForm: () => { },
  selectedFilterStatus: "",
  selectedPriceFilter: "",
};

export const FnbContext = createContext<FnbContextProps>(initialFnBContextValue);