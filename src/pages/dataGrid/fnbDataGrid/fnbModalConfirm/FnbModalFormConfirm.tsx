import { useContext } from "react"
import { FnbContext } from "../fnbContext/fnbContextCreate"

import { CustomButton } from "../../../../_components";

import { Modal } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useFnbModalFormConfirm } from "./useFnbModalFormConfirm";

export function FnbModalFormConfirm() {

  const {
    modalFormConfirmOpen,
    setModalFormConfirmOpen,
  } = useContext(FnbContext);

  const {
    onFooterButtonClick,
  } = useFnbModalFormConfirm();

  return (
    <Modal
      centered
      width={417}
      closable={true}
      maskClosable={false}
      open={modalFormConfirmOpen}
      onCancel={() => setModalFormConfirmOpen && setModalFormConfirmOpen(false)}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ExclamationCircleFilled style={{ color: "#ca4e0d", fontSize: 24 }} />
          <span style={{ fontSize: 20 }}>Changes Detected!</span>
        </div>
      }
      footer={[
        <CustomButton
          key={"yes"}
          loading={false}
          colorType="active"
          onClick={onFooterButtonClick}
        >
          Yes
        </CustomButton>
      ]}
    >
      <div style={{ display: "flex", flexDirection: "column", marginTop: 16 }}>
        <span>Your <code>changes</code> will not be saved,</span>
        <span>your <code>uploaded image</code> will also be deleted.</span>
        <div style={{ marginTop: 16 }}>
          <span>Are you sure ...?</span>
        </div>
      </div>
    </Modal>
  );
};