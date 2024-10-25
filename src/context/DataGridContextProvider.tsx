import { useEffect, useMemo, useRef, useState } from "react";

import { Form } from "antd";
import { DataGridContext, dataGridTabType } from "./contextCreate";

export const DataGridContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [form] = Form.useForm();
  const dataGridContainerRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const [activeTabkey, setActiveTabkey] = useState<dataGridTabType>("detail");
  const [isActionDrawerOpen, setIsActionDrawerOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
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

    /*
    setContainerSize({
      width: dataGridContainerRef.current.clientWidth,
      height: dataGridContainerRef.current.clientHeight,
    });
    */
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
    dataGridContainerRef,
    page, setPage,
    limitPerPage, setLimitPerPage,
    searchValue, setSearchValue,
    containerSize, setContainerSize,
    activeTabkey, setActiveTabkey,
    isActionDrawerOpen, setIsActionDrawerOpen,
    isConfirmModalOpen, setIsConfirmModalOpen,
    isFormChangeDetected, setIsFormChangeDetected,
    isOnMutateData, setIsOnMutateData,
    tableHeight,
  };

  return (
    <DataGridContext.Provider value={contextValues}>
      {children}
    </DataGridContext.Provider>
  );
};