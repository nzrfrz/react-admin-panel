import { useContext } from "react";
import { FnbContext } from "../fnbContext/fnbContextCreate";
import { FnbTableData } from "../FnbTableData";

import { Pagination } from "antd";

export function FnbListContentType() {
  const {
    fnbList,
    page, setPage,
    containerSize,
    setLimitPerPage,
    dataGridContainerRef,
  } = useContext(FnbContext); 

  return (
    <div
      ref={dataGridContainerRef}
      style={{ display: "flex", height: "100%", flexDirection: "column", gap: 16 }}
    >
      {
        containerSize?.width === 0 || containerSize?.height === 0 ?
          null
          :
          <>
            <FnbTableData />
            <Pagination
              current={page}
              showQuickJumper={true}
              showSizeChanger={true}
              disabled={fnbList?.isFetching as boolean}
              total={fnbList?.data && fnbList?.data.data.meta.totalPage}
              onChange={async (currentPage) => setPage && setPage(currentPage)}
              style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
              onShowSizeChange={(_, pageSize) => setLimitPerPage && setLimitPerPage(pageSize)}
              showTotal={(total, range) => { return `${range[0]}-${range[1]} of ${total} items` }}
            />
          </>
      }
    </div>
  );
};