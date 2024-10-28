import { useCallback, useContext, useMemo, useState } from "react";
import { DataGridContext, dataGridTabType } from "../../../context/contextCreate";

import { ItemDetail } from "./ItemDetail";
import { ItemEdit } from "./ItemEdit";

import { Drawer, Modal, ModalFuncProps, Radio, Segmented, Tabs, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { FaEye, FaTrash } from "react-icons/fa";
import { CloseOutlined, DeleteOutlined, ExclamationCircleFilled, SaveOutlined } from '@ant-design/icons';
import { CustomButton } from "../../../_components";
import { useItemEdit } from "./useItemEdit";

export function ActionMenuDrawer() {
  const {
    form,
    modal,
    activeTabkey, setActiveTabkey,
    isActionDrawerOpen,
    setIsActionDrawerOpen,
    setSelectedRowData,
    isFormChangeDetected,
    setIsModalConfirmOpen,
    setModalConfirmType
  } = useContext(DataGridContext);

  const { _handleDeleteFile, resetActionMenuState } = useItemEdit();

  const deleteConfirmation: ModalFuncProps = {
    title: 'Confirm Deletion!',
    content: (
      <span>Are you sure you want to delete ...</span>
    ),
    closable: true,
    maskClosable: true,
    centered: true,
    okText: "Yes",
    onOk(...args) {
      resetActionState();
      console.log("ok modal clicked");
      return args;
    },
  };

  const editConfirmation: ModalFuncProps = {
    title: 'Changes Detected!',
    content: (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>Your changes will not be saved,</span>
        <span>your uploaded image will also be deleted.</span>
        <div style={{ marginTop: 16 }}>
          <span>Are you sure ...?</span>
        </div>
      </div>
    ),
    closable: true,
    maskClosable: true,
    centered: true,
    okText: "Yes",
    async onOk() {
      // try {
      //   return await new Promise((resolve, reject) => {
      //     setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      //   });
      // } catch {
      //   return console.log('Oops errors!');
      // }
      // return _handleDeleteFile();
      await _handleDeleteFile();
      // resetActionState();
      // console.log("\n---edit confirmation-- \n ok modal clicked");
      // return args;
    },
  };

  const renderExtraAction = useMemo(() => {
    if (activeTabkey === "detail") {
      return (
        <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          <CustomButton
            colorType="default"
            icon={<CloseOutlined />}
            tooltipTitle="Cancel"
            tooltipPlacement="bottomLeft"
          />
          <CustomButton
            colorType="error"
            icon={<DeleteOutlined />}
            tooltipTitle="Delete"
            tooltipPlacement="bottomLeft"
            onClick={() => modal?.warning(deleteConfirmation)}
            // onClick={() => {
            //   setModalConfirmType && setModalConfirmType("record deletion");
            //   setIsModalConfirmOpen && setIsModalConfirmOpen(true);
            // }}
            // onClick={showConfirm}
          // onClick={showDeleteConfirmation}
          />
        </div>
      );
    }
    else {
      return (
        <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          <CustomButton
            colorType="default"
            icon={<CloseOutlined />}
            tooltipTitle="Cancel"
            tooltipPlacement="bottomLeft"
          />
          <CustomButton
            colorType="success"
            icon={<SaveOutlined />}
            tooltipTitle="Save"
            tooltipPlacement="bottomLeft"
          />
        </div>
      );
    }
  }, [activeTabkey]);

  const renderDrawerContent = useMemo(() => {
    if (activeTabkey === "detail") return (<ItemDetail />);
    else return (<ItemEdit />);
  }, [activeTabkey]);

  function resetActionState() {
    setIsActionDrawerOpen && setIsActionDrawerOpen((prev) => { return !prev });
    setTimeout(() => {
      setSelectedRowData && setSelectedRowData(undefined);
      setActiveTabkey && setActiveTabkey("detail");
      // form?.resetFields();
    }, 100);
  };

  const onCloseDrawer = useCallback(() => {
    if (isFormChangeDetected) {
      // setModalConfirmType && setModalConfirmType("form changes detection");
      // setIsModalConfirmOpen && setIsModalConfirmOpen(true);
      modal?.warning(editConfirmation);
      // console.log("form changes detected");
      return;
    }
    else return resetActionState();
  }, [isFormChangeDetected]);

  return (
    <Drawer
      closeIcon={false}
      maskClosable={true}
      getContainer={false}
      forceRender={true}
      open={isActionDrawerOpen}
      title={
        <Radio.Group
          disabled={false}
          value={activeTabkey}
          onChange={(e) => setActiveTabkey && setActiveTabkey(e.target.value)}
        >
          <Radio.Button value="detail">Detail</Radio.Button>
          <Radio.Button value="edit">Edit</Radio.Button>
        </Radio.Group>
      }
      extra={renderExtraAction}
      onClose={onCloseDrawer}
    >
      {renderDrawerContent}
    </Drawer>
  );
};