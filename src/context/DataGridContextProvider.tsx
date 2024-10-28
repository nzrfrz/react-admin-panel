import { useEffect, useMemo, useRef, useState } from "react";

import { Form, Modal } from "antd";
import { DataGridContext, dataGridTabType } from "./contextCreate";
import { FnBProps } from "../_utils";
import { modalConfirmType } from "../_components";

export const DataGridContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const dataGridContainerRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const [selectedRowData, setSelectedRowData] = useState<FnBProps | undefined>(undefined);

  const [activeTabkey, setActiveTabkey] = useState<dataGridTabType>("detail");
  const [isActionDrawerOpen, setIsActionDrawerOpen] = useState(false);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [modalConfirmType, setModalConfirmType] = useState<modalConfirmType | undefined>(undefined);
  const [isFormChangeDetected, setIsFormChangeDetected] = useState(false);
  const [isOnMutateData, setIsOnMutateData] = useState(false);

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

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => updateContainerSize());

    if (dataGridContainerRef.current) resizeObserver.observe(dataGridContainerRef.current);
    return () => {
      if (dataGridContainerRef.current) resizeObserver.unobserve(dataGridContainerRef.current);
    }
  }, []);

  const contextValues = {
    form,
    modal,
    dataGridContainerRef,
    page, setPage,
    limitPerPage, setLimitPerPage,
    searchValue, setSearchValue,
    containerSize, setContainerSize,
    selectedRowData, setSelectedRowData,
    activeTabkey, setActiveTabkey,
    isActionDrawerOpen, setIsActionDrawerOpen,
    isModalConfirmOpen, setIsModalConfirmOpen,
    modalConfirmType, setModalConfirmType,
    isFormChangeDetected, setIsFormChangeDetected,
    isOnMutateData, setIsOnMutateData,
    tableHeight,
  };

  return (
    <DataGridContext.Provider value={contextValues}>
      {children}
      {contextHolder}
    </DataGridContext.Provider>
  );
};