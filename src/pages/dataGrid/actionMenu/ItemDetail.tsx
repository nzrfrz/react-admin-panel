import { useContext, useMemo } from "react";
import { DataGridContext } from "../../../context/contextCreate";

import { Divider, Image, Tag } from "antd";
import { CheckCircleOutlined, StopOutlined } from '@ant-design/icons';

export function ItemDetail() {
  const {
    selectedRowData,
  } = useContext(DataGridContext);
  // console.log(selectedRowData);

  const renderProductStatus = useMemo(() => {
    if (selectedRowData?.status === "UNAVAILABLE") return (
      <Tag color={"red"}><StopOutlined /> Unavailable</Tag>
    );
    else return (
      <Tag color={"lime"}><CheckCircleOutlined /> Available</Tag>
    );
  }, [selectedRowData]);

  return (
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
        <span style={{ fontSize: 20, fontWeight: 500 }}>{selectedRowData?.name}</span>
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
  );
};