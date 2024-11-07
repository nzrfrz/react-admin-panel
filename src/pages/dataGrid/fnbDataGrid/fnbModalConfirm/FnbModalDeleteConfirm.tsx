import { useContext } from "react"
import { FnbContext } from "../fnbContext/fnbContextCreate"

import { CustomButton } from "../../../../_components";

import { Modal } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useFnbModalDeleteConfirm } from "./useFnbModalDeleteConfirm";

export function FnbModalDeleteConfirm() {
  const {
    selectedRowData,
    modalDeleteConfirmOpen,
    setModalDeleteConfirmOpen,
  } = useContext(FnbContext);

  const {
    onDeleteFooterButton,
    isActionInProgress,
  } = useFnbModalDeleteConfirm();

  return (
    <Modal
      centered
      width={417}
      closable={!isActionInProgress}
      maskClosable={false}
      open={modalDeleteConfirmOpen}
      onCancel={() => setModalDeleteConfirmOpen && setModalDeleteConfirmOpen(false)}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ExclamationCircleFilled style={{ color: "#ca4e0d", fontSize: 24 }} />
          <span style={{ fontSize: 20 }}>Delete Confirmation!</span>
        </div>
      }
      footer={[
        <CustomButton
          key={"yes"}
          colorType="active"
          loading={isActionInProgress}
          onClick={onDeleteFooterButton}
        >
          Yes
        </CustomButton>
      ]}
    >
      <div style={{ display: "flex", flexDirection: "column", marginTop: 16 }}>
        <span>Are you sure you want to delete <code>{selectedRowData?.name}</code> ...?</span>
      </div>
    </Modal>
  );
};