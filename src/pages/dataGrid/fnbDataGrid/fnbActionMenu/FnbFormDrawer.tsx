import { useContext, useMemo } from "react";
import { FnbContext } from "../fnbContext/fnbContextCreate";
import {
  CustomButton,
  InputForm,
  InputNumberForm,
  SelectForm,
  TextAreaForm,
  UploadFieldForm
} from "../../../../_components";

import { useFnbForm } from "./useFnbForm";

import { Drawer, Form, FormInstance, Segmented } from "antd";
import { SaveOutlined } from '@ant-design/icons';

export function FnbFormDrawer() {
  const {
    form,
    formMode,
    isFormDrawerOpen,
    onCloseDrawerForm,
  } = useContext(FnbContext);

  const {
    handleSaveForm,
    isActionInProgress,
    fnbCategoriesSelectOptions,
    uploadResults, setUploadResults,
    setFormItemStatus,
  } = useFnbForm();

  const renderTitle = useMemo(() => {
    if (formMode === "edit") return "Edit Item";
    else return "Add New Item";
  }, [formMode]);

  return (
    <Drawer
      forceRender={true}
      title={renderTitle}
      getContainer={false}
      open={isFormDrawerOpen}
      onClose={onCloseDrawerForm}
      closable={!isActionInProgress}
      maskClosable={!isActionInProgress}
      extra={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CustomButton
            colorType="success"
            tooltipTitle="Save"
            icon={<SaveOutlined />}
            onClick={handleSaveForm}
            tooltipPlacement="bottomLeft"
            disabled={isActionInProgress}
          />
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Form
          form={form}
          name="product"
          layout="vertical"
          scrollToFirstError
          wrapperCol={{ span: 24 }}
          disabled={isActionInProgress}
        >
          <UploadFieldForm
            formInstance={form as FormInstance}
            formItemName="image"
            isRulesRequired={false}
            previewImage={true}
            uploadResults={uploadResults}
            setUploadResults={setUploadResults}
            uploadApiEndpoint={import.meta.env.VITE_FNB_UPLOAD_IMAGE_ENDPOINT}
            deleteApiEndpoint={import.meta.env.VITE_FNB_DELETE_IMAGE_ENDPOINT}
          />
          <InputForm
            label="Name"
            name="name"
            isRulesRequired={true}
          />
          <TextAreaForm
            label="Description"
            name="description"
            isRulesRequired={true}
          />
          <SelectForm
            showSearch
            name="category"
            label="Category"
            isRulesRequired={true}
            disabled={isActionInProgress}
            isLoading={isActionInProgress}
            selectOptions={fnbCategoriesSelectOptions as []}
          />
          <InputNumberForm
            name="price"
            label="Price"
            inputMode="currency"
            addonBefore="$"
          />
          <Form.Item
            label="Product Status"
            name="status"
          >
            <Segmented<string>
              block
              disabled={isActionInProgress}
              options={["AVAILABLE", "UNAVAILABLE"]}
              onChange={(value) => setFormItemStatus && setFormItemStatus(value)}
            />
          </Form.Item>
          {/* <div style={{ paddingTop: 4, marginBottom: 8 }}>
            <div>
              <span>Set Status</span>
            </div>
            <Segmented<string>
              block
              value={formItemStatus}
              disabled={false}
              options={["AVAILABLE", "UNAVAILABLE"]}
              onChange={(value) => setFormItemStatus && setFormItemStatus(value)}
            />
          </div> */}
        </Form>
      </div>
    </Drawer>
  );
};