import { useContext } from "react";
import { DataGridContext } from "../../context/contextCreate";

import { FnBProps } from "../../_utils";
import { CustomButton } from "../../_components";

import { Table, TableProps, Tag } from "antd";
import { FiMoreVertical } from "react-icons/fi";

interface ThisProps {
  isLoading: boolean,
  tableData?: FnBProps[] | undefined,
};

export const TableData: React.FC<ThisProps> = ({
  isLoading,
  tableData
}) => {

  const {
    tableHeight,
    setIsActionDrawerOpen,
    setSelectedRowData,
  } = useContext(DataGridContext);

  const onClickActionMenu = (rowData: FnBProps) => {
    setSelectedRowData && setSelectedRowData(rowData);
    setIsActionDrawerOpen && setIsActionDrawerOpen(true);
  };
  // console.log(tableHeight);

  const columns: TableProps<FnBProps>["columns"] = [
    {
      title: "No",
      width: 35,
      fixed: "left",
      render: (_, __, index) => (
        <span>{index + 1}</span>
      )
    },
    {
      title: "Name",
      width: 150,
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 16 }}>
          <span>{record.name}</span>
        </div>
      )
    },
    {
      title: "Description",
      width: 250,
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: "Price",
      width: 50,
      render: (_, record) => (
        <span>$ {record.price}</span>
      )
    },
    {
      title: "Category",
      width: 90,
      render: (_, record) => (
        <span>{record?.category && record?.category?.title}</span>
      )
    },
    {
      title: "Status",
      width: 70,
      render: (_, record) => (
        <Tag color={record?.status === "UNAVAILABLE" ? "red" : "lime"}>{record?.status}</Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 50,
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CustomButton
            size="small"
            shape="circle"
            icon={<FiMoreVertical />}
            onClick={() => onClickActionMenu(record)}
          />
        </div>
      )
    }
  ];

  return (
    <>
      <Table
        columns={columns}
        pagination={false}
        loading={isLoading}
        dataSource={tableData}
        rowKey={(record) => record.id}
        scroll={{ x: 1200, y: tableHeight }}
      />
    </>
  );
};