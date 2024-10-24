import { useMemo, useState } from "react";
import { 
  fileType, 
  initialUploadResultsValue, 
  nonImageAllowedFileType, 
  nonImageFileTypeData, 
  UploadResultProps,
} from "../../../../_utils";

import { Card, Checkbox, CheckboxProps, Select, Switch } from "antd";
import { CustomButton, UploadField } from "../../../../_components";
import { useUploadFile } from "../../../../_components/uploadField/useUploadFile";

const docTypeTempItems = nonImageFileTypeData.map((data) => {
  return {
    label: data.extension,
    value: data.extension,
    slug: data.extension,
  }
});

export function FileUploader() {
  const [uploadResults, setUploadResults] = useState<UploadResultProps>(initialUploadResultsValue);
  const [uploadFileType, setUploadFileType] = useState<fileType>("image");
  const [imageWithPreview, setImageWithPreview] = useState(true);
  const [docType, setDoctype] = useState<string | undefined>(undefined);

  const toggleSwitch = (e: boolean) => {
    setDoctype(undefined);
    setImageWithPreview(true);
    setUploadResults(initialUploadResultsValue);
    if (e === false) setUploadFileType("image");
    else setUploadFileType("non-image");
  };

  const onCheckboxChange: CheckboxProps['onChange'] = (e) => {
    setImageWithPreview(e.target.checked);
  };

  const handleSelectDoctype = (value: string) => setDoctype(value);

  const uploadEndpoint = useMemo(() => {
    if (uploadFileType === "image") {
      return import.meta.env.VITE_PLAYGROUND_UPLOAD_IMAGE_ENDPOINT;
    }
    return import.meta.env.VITE_PLAYGROUND_UPLOAD_NON_IMAGE_ENDPOINT
  }, [uploadFileType]);

  const deleteEndpoint = useMemo(() => {
    if (uploadFileType === "image") {
      return import.meta.env.VITE_PLAYGROUND_DELETE_IMAGE_ENDPOINT;
    }
    return import.meta.env.VITE_PLAYGROUND_DELETE_NON_IMAGE_ENDPOINT
  }, [uploadFileType]);

  const { handleDeleteFile } = useUploadFile(uploadEndpoint, deleteEndpoint, setUploadResults);

  async function _handleDeleteFile () {
    setUploadResults((prev) => {
      return {
        ...prev,
        isLoading: true,
        statusAction: "on delete",
        statusMessage: "Deleting file...",
      }
    });
    try {
      const results = await handleDeleteFile(uploadResults.fileResults.fileName);
      setUploadResults(initialUploadResultsValue);
      console.warn(results);      
    } catch (error) {
      console.error(error);      
    }
  };

  return (
    <Card title="File Upload">
      <div style={{ display: "flex", flexDirection: "row", marginBottom: 16, justifyContent: "flex-end", gap: 8 }}>
        <Switch
          checkedChildren="File"
          unCheckedChildren="Image"
          onChange={toggleSwitch}
        />
        <Checkbox
          style={{ display: uploadFileType === "non-image" ? "none" : "flex" }}
          onChange={onCheckboxChange}
          checked={imageWithPreview}
        >
          With Preview
        </Checkbox>
        <Select
          size="small"
          value={docType}
          placeholder="Select docType"
          options={docTypeTempItems}
          onChange={handleSelectDoctype}
          style={{ minWidth: 120, display: uploadFileType === "non-image" ? "block" : "none" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, }} >
        <UploadField
          docType={docType as nonImageAllowedFileType}
          previewImage={imageWithPreview}
          toUploadFileType={uploadFileType}
          uploadResults={uploadResults}
          setUploadResults={setUploadResults}
          uploadApiEndpoint={uploadEndpoint}
          deleteApiEndpoint={deleteEndpoint}
        />
      </div>
      <div 
        style={{
          marginTop: 16,
          display: uploadResults.fileResults.url === "" ? "none" : "block"
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <span>Upload Results: </span>
          <CustomButton
            size="small"
            colorType="error"
            onClick={_handleDeleteFile}
            disabled={uploadResults.isLoading}
          >
            Delete File
          </CustomButton>
        </div>
        <div style={{ width: 250, marginTop: 8 }}>
          <pre>{JSON.stringify(uploadResults.fileResults, null, 2)}</pre>
        </div>
      </div>
    </Card>
  );
};