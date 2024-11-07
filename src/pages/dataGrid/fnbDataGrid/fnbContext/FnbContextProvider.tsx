import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FilterOptionProps, FnbContext, FnbContextProps } from "./fnbContextCreate";
import {
  ApiSuccessResponse,
  FnBProps,
  PaginatedMetaProps,
  useQueryHook,
} from "../../../../_utils";
import { isEqual } from "lodash";
import { useInfiniteQueryHook } from "../../../../_utils/api/useInfiniteQueryHook";
import { GlobalContext } from "../../../../context/contextCreate";

export const FnbContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {windowDimension} = useContext(GlobalContext);

  const [form] = Form.useForm();
  const navigateTo = useNavigate();
  const dataGridContainerRef = useRef<HTMLDivElement | null>(null);

  const [displayContentType, setDisplayContentType] = useState<"List" | "Grid" | string>("List");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });  

  const [page, setPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(12);
  const [searchValue, setSearchValue] = useState("");

  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isFormDrawerOpen, setIsFormDrawerOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit" | undefined>(undefined);

  const [modalDeleteConfirmOpen, setModalDeleteConfirmOpen] = useState(false);
  const [modalFormConfirmOpen, setModalFormConfirmOpen] = useState(false);

  const [selectedRowData, setSelectedRowData] = useState<FnBProps | undefined>(undefined);

  const [fnbFilterMenuOpen, setFnbFilterMenuOpen] = useState(false);
  const [dateFilterOptions, setDateFilterOptions] = useState<FilterOptionProps[] | undefined>(undefined);
  const [priceFilterOptions, setPriceFilterOptions] = useState<FilterOptionProps[] | undefined>(undefined);
  const [statusFilterOptions, setStatusFilterOptions] = useState<FilterOptionProps[] | undefined>(undefined);
  // const [categoriesFilterOption, setCategoriesFilterOption] = useState<FilterOptionProps[] | undefined>(undefined);
  const [selectedCategoriesFilterOption, setSelectedCategoriesFilterOption] = useState<string>("");

  const selectedFilterStatus = useMemo(() => {
    const temp = statusFilterOptions?.find((data) => data.isSelected === true);
    if (temp !== undefined) return temp.value;
    else return "";
  }, [statusFilterOptions]);

  const selectedPriceFilter = useMemo(() => {
    const temp = priceFilterOptions?.find((data) => data.isSelected === true);
    if (temp !== undefined) return temp.value;
    else return "";
  }, [priceFilterOptions]);

  // const selectedCategoryFilter = useMemo(() => {
  //   const temp = categoriesFilterOption?.find((data: FilterOptionProps) => data.isSelected === true);
  //   if (temp !== undefined) return temp.key;
  //   else return "";
  // }, [categoriesFilterOption]);

  const fnbList = useQueryHook<ApiSuccessResponse<{ meta: PaginatedMetaProps, itemList: FnBProps[] }>>(
    false,
    `/api/fnb/get?page=${page}&limit=${limitPerPage}&category=${selectedCategoriesFilterOption}&priceFilter=${selectedPriceFilter}&status=${selectedFilterStatus}&q=${searchValue}`,
    ["fnbList", page as number, limitPerPage as number, selectedPriceFilter, selectedFilterStatus, selectedCategoriesFilterOption, searchValue as string],
    10,
  );

  const infiniteFnbList = useInfiniteQueryHook<ApiSuccessResponse<{ meta: PaginatedMetaProps, itemList: FnBProps[] }>>(
    false,
    "/api/fnb/get?",
    `&category=${selectedCategoriesFilterOption}&priceFilter=${selectedPriceFilter}&status=${selectedFilterStatus}&q=${searchValue}`,
    ["infiniteFnbList", limitPerPage, selectedPriceFilter, selectedFilterStatus, selectedCategoriesFilterOption, searchValue],
    limitPerPage,
    10,
    (lastPage) => {
      const currentPage = lastPage?.data.meta.page;
      const totalPages = lastPage?.data.meta.totalPage;
      const maxPageRange = Math.ceil(totalPages / limitPerPage);
      if (currentPage >= maxPageRange) return undefined;
      else return currentPage + 1;
    }
  ); 

  const onClickActionMenu = (rowData: FnBProps) => {
    setSelectedRowData(rowData);
    setIsDetailDrawerOpen(true);
  };

  function onCLickAdd() {
    form.resetFields();
    setIsFormDrawerOpen(true);
    setFormMode("add");
  };

  function onCLickEdit() {
    setIsDetailDrawerOpen(false);
    setIsFormDrawerOpen(true);
    setFormMode("edit");
  };

  const onCloseDrawerForm = () => {
    const formInstanceValue = form.getFieldsValue();
    if (formMode === "add") {
      const { status, ...temp } = formInstanceValue;
      const allValuesAreUndefined = Object.values(temp).every((value) => value === undefined || value === "");
      if (allValuesAreUndefined) return setIsFormDrawerOpen(false);
      else return setModalFormConfirmOpen(true);
    }
    else {
      if (selectedRowData === undefined) return;
      const { id, category, ...tempRowData } = selectedRowData;
      const _selectedRowData = {
        ...tempRowData,
        category: selectedRowData.category.id,
      };

      if (isEqual(formInstanceValue, _selectedRowData)) return setIsFormDrawerOpen(false);
      else return setModalFormConfirmOpen(true);
      // console.log("\n edit form: \n", formInstanceValue);
      // console.log("\n selected row data: \n", _selectedRowData);
    }
  };

  function updateContainerSize() {
    if (dataGridContainerRef.current === null) return;

    const newWidth = dataGridContainerRef.current.clientWidth;
    const newHeight = dataGridContainerRef.current.clientHeight;

    // Only update state if the size actually changes
    if (newWidth !== containerSize.width || newHeight !== containerSize.height) {
      setContainerSize({ width: newWidth, height: newHeight });
    }
  };

  const tableHeight = useMemo(() => {
    if (containerSize.height === 0) return 0;
    const gap = 16;
    const exessHeight = 60;
    const paginationElementHeight = 32;
    const originalHeight = containerSize.height - (gap + paginationElementHeight);
    return originalHeight - exessHeight;
  }, [containerSize]);

  // resize observer
  useEffect(() => {
    if (displayContentType === "Grid") return;

    const resizeObserver = new ResizeObserver(() => updateContainerSize());

    if (dataGridContainerRef.current) resizeObserver.observe(dataGridContainerRef.current);
    return () => {
      if (dataGridContainerRef.current) resizeObserver.unobserve(dataGridContainerRef.current);
    }
  }, [displayContentType]);

  useEffect(() => {
    if (displayContentType === "Grid") return setLimitPerPage(12);
    else return setLimitPerPage(10);
  }, [displayContentType]);

  useEffect(() => {
    if (windowDimension.width <= 810) return setDisplayContentType("Grid");
  }, [windowDimension.width]);

  // pagination url
  useEffect(() => {
    navigateTo({ search: `?limit=${limitPerPage}&page=${page}&category=${selectedCategoriesFilterOption}&priceFilter=${selectedPriceFilter}&status=${selectedFilterStatus}&q=${searchValue}` }, { replace: true });
  }, [page, limitPerPage, searchValue, selectedFilterStatus, selectedPriceFilter, selectedCategoriesFilterOption]);

  const contextValues = {
    form,
    dataGridContainerRef,
    containerSize, setContainerSize,
    displayContentType, setDisplayContentType,

    page, setPage,
    limitPerPage, setLimitPerPage,
    searchValue, setSearchValue,

    isDetailDrawerOpen, setIsDetailDrawerOpen,
    isFormDrawerOpen, setIsFormDrawerOpen,
    formMode, setFormMode,

    modalDeleteConfirmOpen, setModalDeleteConfirmOpen,
    modalFormConfirmOpen, setModalFormConfirmOpen,

    selectedRowData, setSelectedRowData,

    fnbFilterMenuOpen, setFnbFilterMenuOpen,
    dateFilterOptions, setDateFilterOptions,
    priceFilterOptions, setPriceFilterOptions,
    statusFilterOptions, setStatusFilterOptions,
    selectedCategoriesFilterOption, setSelectedCategoriesFilterOption,

    fnbList,
    infiniteFnbList,
    tableHeight,
    onClickActionMenu,
    onCLickAdd,
    onCLickEdit,
    onCloseDrawerForm,
    selectedFilterStatus,
    selectedPriceFilter,
  };

  return (
    <FnbContext.Provider value={contextValues as FnbContextProps}>
      {children}
    </FnbContext.Provider>
  );
};