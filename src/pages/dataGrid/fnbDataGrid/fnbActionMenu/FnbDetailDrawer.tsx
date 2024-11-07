import { useContext, useMemo } from "react";
import { FnbContext } from "../fnbContext/fnbContextCreate";

import { Drawer, Divider, Image, Tag } from "antd";
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, StopOutlined } from '@ant-design/icons';
import { CustomButton } from "../../../../_components";

export function FnbDetailDrawer () {
  const {
    selectedRowData,
    isDetailDrawerOpen,
    setIsDetailDrawerOpen,
    setModalDeleteConfirmOpen,
    onCLickEdit,
  } = useContext(FnbContext);

  const renderProductStatus = useMemo(() => {
    if (selectedRowData?.status === "UNAVAILABLE") return (
      <Tag color={"red"}><StopOutlined /> Unavailable</Tag>
    );
    else return (
      <Tag color={"lime"}><CheckCircleOutlined /> Available</Tag>
    );
  }, [selectedRowData]);

  return (
    <Drawer
      maskClosable={true}
      getContainer={false}
      forceRender={true}
      title="Item Detail"
      open={isDetailDrawerOpen}
      onClose={() => setIsDetailDrawerOpen && setIsDetailDrawerOpen(false)}
      extra={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CustomButton
            colorType="warning"
            icon={<EditOutlined />}
            onClick={onCLickEdit}
          >
            Edit
          </CustomButton>
          <CustomButton
            colorType="error"
            icon={<DeleteOutlined />}
            tooltipTitle="Delete"
            tooltipPlacement="bottomLeft"
            onClick={() => setModalDeleteConfirmOpen && setModalDeleteConfirmOpen(true)}
          />
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Image
            height={250}
            width={"100%"}
            preview={false}
            src={selectedRowData?.image.url}
            style={{ objectFit: "cover", borderRadius: 12 }}
            fallback={import.meta.env.VITE_BROKEN_IMAGE_URL}
          />
          <span className="two-line-ellipsis-text" style={{ fontSize: 20, fontWeight: 500 }}>{selectedRowData?.name}</span>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {renderProductStatus}
            <span>{selectedRowData?.category.title}</span>
            <span style={{ fontSize: 16, fontWeight: 500 }}>$ {selectedRowData?.price}</span>
          </div>
        </div>
        <Divider style={{ margin: 0, }} />
        <div>
          <span>{selectedRowData?.description}</span>
        </div>
      </div>
    </Drawer>
  );
};