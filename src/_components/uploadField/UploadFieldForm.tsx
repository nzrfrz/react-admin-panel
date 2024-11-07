import { useContext, useMemo } from "react";
import { GlobalContext } from "../../context/contextCreate";

import { UploadField } from "./UploadField";

import { Form, FormInstance } from "antd";
import { fileType, generalValidation, nonImageAllowedFileType, noValidation, UploadResultProps } from "../../_utils";

interface ThisProps {
  uploadResults: UploadResultProps,
  setUploadResults: React.Dispatch<React.SetStateAction<UploadResultProps>>,
  previewImage?: boolean,
  toUploadFileType?: fileType,
  docType?: nonImageAllowedFileType,
  uploadApiEndpoint: string,
  deleteApiEndpoint: string,

  formInstance: FormInstance,
  formItemName: string | [number, string] | undefined,
  isRulesRequired: boolean,
};

export const UploadFieldForm: React.FC<ThisProps> = ({
  uploadResults,
  setUploadResults,
  previewImage = true,
  toUploadFileType = "image",
  docType = undefined,
  uploadApiEndpoint,
  deleteApiEndpoint,

  formInstance,
  formItemName,
  isRulesRequired,
}) => {
  const { language } = useContext(GlobalContext);

  const fieldRules = useMemo(() => {
    if (isRulesRequired === false) return noValidation;
    else return generalValidation.find((item) => item.language === language)?.fieldRules;
  }, [language, isRulesRequired]);

  const setFormItemJustifyContent = useMemo<string>(() => {
    switch (true) {
      case toUploadFileType === "image" && previewImage === true:
        return "center";
      case toUploadFileType === "image" && previewImage === false:
        return "flex-start";
      case toUploadFileType === "non-image":
        return "flex-start";
      default:
        return "center";
    }
  }, [toUploadFileType, previewImage]);

  const setFormItemDisplay = useMemo<string>(() => {
    switch (true) {
      case toUploadFileType === "image" && previewImage === true:
        return "flex";
      case toUploadFileType === "image" && previewImage === false:
        return "block";
      case toUploadFileType === "non-image":
        return "block";
      default:
        return "flex";
    }
  }, [toUploadFileType, previewImage]);

  return (
    <Form.Item
      label=""
      help={true}
      required={true}
      hasFeedback={true}
      name={formItemName}
      style={{ display: setFormItemDisplay, justifyContent: setFormItemJustifyContent }}
      rules={fieldRules}
    >
      <UploadField
        formInstance={formInstance}
        formItemName={formItemName as string}
        docType={docType as nonImageAllowedFileType}
        previewImage={previewImage}
        toUploadFileType={toUploadFileType}
        uploadResults={uploadResults}
        setUploadResults={setUploadResults}
        uploadApiEndpoint={uploadApiEndpoint}
        deleteApiEndpoint={deleteApiEndpoint}
      />
    </Form.Item>
  );
};