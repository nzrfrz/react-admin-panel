import { useContext, useEffect, useState } from "react";
import { DataGridContext } from "../../context/contextCreate";
import { useNavigate } from "react-router-dom";
import { FnBProps, useQueryHook } from "../../_utils";
import { ApiSuccessResponse, PaginatedMetaProps } from "../../_utils/props/apiResponseProps";
import { MainContainer } from "../../_components";
import { TableData } from "./TableData";
import { Pagination } from "antd";

export function FnBDataGrid() {
  const navigateTo = useNavigate();
  const [fnbStatus, setFnbStatus] = useState("");

  const {
    page, setPage,
    limitPerPage, setLimitPerPage,
    searchValue, setSearchValue,
    dataGridContainerRef,
    containerSize,
  } = useContext(DataGridContext);

  const fnbList = useQueryHook<ApiSuccessResponse<{ meta: PaginatedMetaProps, fnbList: FnBProps[] }>>(
    false,
    `/api/fnb/get?page=${page}&limit=${limitPerPage}&status=${fnbStatus}&q=${searchValue}`,
    ["fnbList", page as number, limitPerPage as number, fnbStatus, searchValue as string],
    10,
  );
  // console.log(containerSize);

  useEffect(() => {
    navigateTo({ search: `?limit=${limitPerPage}&page=${page}&status=${fnbStatus}&q=${searchValue}` }, { replace: true });
  }, [page, limitPerPage, searchValue, fnbStatus]);

  return (
    <MainContainer>
      <div style={{ display: "flex", height: "inherit", flexDirection: "column" }}>
        <div><h1>Food and Beverages</h1></div>
        <div
          ref={dataGridContainerRef}
          style={{ display: "flex", height: "100%", flexDirection: "column", gap: 16 }}
        >
          {
            containerSize?.width === 0 || containerSize?.height === 0 ?
            null
            :
            <>
            <TableData 
              isLoading={fnbList.isFetching}
              tableData={fnbList.data?.data.fnbList as FnBProps[]}
            />
            <Pagination
              current={page}
              showQuickJumper={true}
              showSizeChanger={true}
              disabled={fnbList.isFetching}
              total={fnbList.data && fnbList?.data.data.meta.totalPage}
              onChange={async (currentPage) => setPage && setPage(currentPage)}
              style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
              onShowSizeChange={(_, pageSize) => setLimitPerPage && setLimitPerPage(pageSize)}
              showTotal={(total, range) => { return `${range[0]}-${range[1]} of ${total} items` }}
            />
            </>
          }
        </div>
      </div>
    </MainContainer>
  );
};