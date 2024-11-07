import { useContext } from "react";
import { FnbContext } from "../fnbContext/fnbContextCreate";

import { Drawer, Divider, Segmented } from "antd";
import { GlobalContext } from "../../../../context/contextCreate";
import { FnbStatusFilter } from "./FnbStatusFilter";
import { FnbPriceFilter } from "./FnbPriceFilter";
import { FnbCategoriesFilter } from "./FnbCategoriesFilter";

interface ThisProps {
  isOpenFilterDrawer: boolean,
  setIsOpenFilterDrawer: React.Dispatch<React.SetStateAction<boolean>>
};

export const FnbFilterMenuDrawer: React.FC<ThisProps> = ({
  isOpenFilterDrawer,
  setIsOpenFilterDrawer,
}) => {
  const { windowDimension } = useContext(GlobalContext);

  const {
    displayContentType,
    setDisplayContentType,
  } = useContext(FnbContext);

  return (
    <Drawer
      width={200}
      maskClosable={true}
      getContainer={false}
      forceRender={true}
      title="Filter Menu"
      open={isOpenFilterDrawer}
      styles={{
        body: { padding: "16px 8px" }
      }}
      onClose={() => setIsOpenFilterDrawer && setIsOpenFilterDrawer(false)}
    >
      <div>
        <Segmented<string>
          block
          disabled={windowDimension.width <= 810}
          value={displayContentType}
          options={["List", "Grid"]}
          onChange={(value) => setDisplayContentType && setDisplayContentType(value as string)}
        />
        <Divider style={{ margin: "8px 0px" }} />
        <FnbStatusFilter />
        <Divider style={{ margin: "8px 0px" }} />
        <FnbPriceFilter />
        <Divider style={{ margin: "8px 0px" }} />
        <FnbCategoriesFilter />
      </div>
    </Drawer>
  );
};