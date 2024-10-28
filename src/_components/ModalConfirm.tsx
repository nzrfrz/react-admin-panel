import { useMemo } from "react";

import { CustomButton } from "./CustomButton";

import { Modal } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';

export type modalConfirmType = "record deletion" | "form changes detection" | undefined;

interface ThisProps {
  modalOpen: boolean,
  isLoading: boolean,
  closable: boolean,
  onCancel: () => void,
  footerButtonClick: () => void,
  confirmType: modalConfirmType,
  selectedItemName?: string | undefined,
};

export const ModalConfirm: React.FC<ThisProps> = ({
  modalOpen,
  isLoading,
  closable,
  onCancel,
  footerButtonClick,
  confirmType,
  selectedItemName,
}) => {

  const renderModalTitle = useMemo(() => {
    let title;
    if (confirmType === "record deletion") title = <span style={{ fontSize: 20 }}>Confirm Deletion!</span>
    else title = <span style={{ fontSize: 20 }}>Changes Detected!</span>

    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <ExclamationCircleFilled style={{ color: "gold", fontSize: 24 }} />
        {title}
      </div>
    );
  }, [confirmType]);

  const renderModalContent = useMemo(() => {
    if (confirmType === "record deletion") return (
      <span>Are you sure you want to delete {selectedItemName} ...?</span>
    );
    else return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>Your changes will not be saved,</span>
        <span>your uploaded image will also be deleted.</span>
        <div style={{ marginTop: 16 }}>
          <span>Are you sure ...?</span>
        </div>
      </div>
    );
  }, [confirmType, selectedItemName]);

  return (
    <Modal
      centered
      width={400}
      open={modalOpen}
      closable={closable}
      onCancel={onCancel}
      maskClosable={false}
      title={renderModalTitle}
      footer={[
        <CustomButton
          key={"yes"}
          loading={isLoading}
          colorType="active"
          onClick={footerButtonClick}
        >
          Yes
        </CustomButton>
      ]}
    >
      {renderModalContent}
    </Modal>
  );
};