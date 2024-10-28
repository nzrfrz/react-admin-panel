import { useContext } from "react";
import { DataGridContext } from "../../../context/contextCreate";

import { useItemEdit } from "./useItemEdit";
import { 
  InputForm, 
  InputNumberForm, 
  SelectForm, 
  TextAreaForm, 
  UploadField,
} from "../../../_components";

import { Form, Segmented } from "antd";

export function ItemEdit() {
  const { form } = useContext(DataGridContext);

  const {
    uploadResults,
    setUploadResults,
    fnbCategoriesSelectOptions,
    productStatus, setProductStatus,
    setFormValueChanges,
  } = useItemEdit();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <UploadField
        previewImage={true}
        uploadResults={uploadResults}
        setUploadResults={setUploadResults}
        uploadApiEndpoint={import.meta.env.VITE_FNB_UPLOAD_IMAGE_ENDPOINT}
        deleteApiEndpoint={import.meta.env.VITE_FNB_DELETE_IMAGE_ENDPOINT}
      />
      <Form
        form={form}
        name="product"
        layout="vertical"
        scrollToFirstError
        wrapperCol={{ span: 24 }}
        onValuesChange={(_, allValues) => setFormValueChanges(allValues)}
      >
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
          selectOptions={fnbCategoriesSelectOptions}
        />
        <InputNumberForm
          name="price"
          label="Price"
          inputMode="currency"
          addonBefore="$"
        />
        <div style={{ paddingTop: 4, marginBottom: 8 }}>
          <div>
            <span>Set Status</span>
          </div>
          <Segmented<string>
            block
            value={productStatus}
            disabled={false}
            options={["AVAILABLE", "UNAVAILABLE"]}
            onChange={(value) => setProductStatus(value)}
          />
        </div>
      </Form>
    </div>
  );
};