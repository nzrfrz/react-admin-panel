import { useContext, useState } from "react";
import { FnbContext } from "./fnbContext/fnbContextCreate";

import { CustomButton, MainContainer, SearchInput } from "../../../_components";

import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';

import { FnbFormDrawer } from "./fnbActionMenu/FnbFormDrawer";
import { FnbDetailDrawer } from "./fnbActionMenu/FnbDetailDrawer";
import { FnbModalFormConfirm } from "./fnbModalConfirm/FnbModalFormConfirm";
import { FnbModalDeleteConfirm } from "./fnbModalConfirm/FnbModalDeleteConfirm";
import { FnbGridContentType } from "./fnbDisplayContentType/FnbGridContentType";
import { FnbListContentType } from "./fnbDisplayContentType/FnbListContentType";
import { FnbFilterMenuDrawer } from "./fnbFilterMenu/FnbFilterMenuDrawer";
import { useDebounce } from "../../../_hooks";

export function FnbDataGrid() {
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);

  const {
    fnbList,
    onCLickAdd,
    infiniteFnbList,
    displayContentType,
    setSearchValue,
  } = useContext(FnbContext);

  const debounceSave = useDebounce((nextValue) => {
    setSearchValue && setSearchValue(nextValue);
  }, 700);

  return (
    <MainContainer>
      <div style={{ display: "flex", height: "inherit", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <h1>Food and Beverages</h1>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8 }}>
            <SearchInput
              placeHolder="Find something..."
              onChange={(e) => debounceSave(e.target.value)}
              onSearch={(value) => setSearchValue && setSearchValue(value)}
              disabled={fnbList?.isFetching || infiniteFnbList?.isFetching || infiniteFnbList?.isFetchingNextPage}
            />
            <CustomButton
              colorType="active"
              onClick={onCLickAdd}
              icon={<PlusOutlined />}
              disabled={fnbList?.isFetching || infiniteFnbList?.isFetching || infiniteFnbList?.isFetchingNextPage}
            >
              Add
            </CustomButton>
            <CustomButton
              shape="circle"
              colorType="active"
              icon={<EllipsisOutlined />}
              onClick={() => setIsOpenFilterDrawer(true)}
            />
          </div>
        </div>
        {
          displayContentType === "List" ?
            <FnbListContentType />
            :
            <FnbGridContentType />
        }
      </div>

      <FnbFilterMenuDrawer
        isOpenFilterDrawer={isOpenFilterDrawer}
        setIsOpenFilterDrawer={setIsOpenFilterDrawer}
      />
      <FnbDetailDrawer />
      <FnbFormDrawer />

      <FnbModalFormConfirm />
      <FnbModalDeleteConfirm />
    </MainContainer>
  );
};