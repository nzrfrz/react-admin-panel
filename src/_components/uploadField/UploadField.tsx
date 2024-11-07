import { useUploadField } from "./useUploadField";
import { useSelectFile } from "./useSelectFile";
import { fileType, nonImageAllowedFileType, UploadResultProps } from "../../_utils";

import { CustomButton } from "../CustomButton";

import { FormInstance, Image, theme, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import styles from "../../_styles/UploadField.module.css";

// const objectKey = "someKey";
// const objects = {
//   [objectKey]: "some object value"
// }
// console.log(objects);

interface ThisProps {
  formInstance?: FormInstance | undefined,
  formItemName?: string | undefined,
  uploadResults: UploadResultProps,
  setUploadResults: React.Dispatch<React.SetStateAction<UploadResultProps>>,
  previewImage?: boolean,
  toUploadFileType?: fileType,
  docType?: nonImageAllowedFileType,
  uploadApiEndpoint: string,
  deleteApiEndpoint: string,
};

export const UploadField: React.FC<ThisProps> = ({
  formInstance,
  formItemName,
  uploadResults,
  setUploadResults,
  previewImage = true,
  toUploadFileType = "image",
  docType = undefined,
  uploadApiEndpoint,
  deleteApiEndpoint,
}) => {

  const {
    previewImageStyles,
    statusMessageTextColor,
    previewImageRendered,
    renderDoctypeHint,
    renderProgress,
    setImageSrc,
    statusMessageClassname,
    showHiddenPreview, setShowHiddenPreview,
    scaleStep,
    onClickHelperMessage,
    setImageObjectFit,
  } = useUploadField(
    formInstance,
    formItemName,
    uploadResults,
    setUploadResults,
    styles,
    previewImage,
    toUploadFileType,
    docType,
  );

  const {
    onSelectFile,
  } = useSelectFile(
    formInstance,
    formItemName,
    toUploadFileType,
    uploadResults,
    setUploadResults,
    uploadApiEndpoint,
    deleteApiEndpoint,
    docType,
  );

  const {
    token: {
      borderRadiusSM,
    },
  } = theme.useToken();

  return (
    <div className={previewImageStyles.container}>
      <div className={previewImageStyles.uploadWrapper}>
        <div>
          {
            previewImageRendered === true &&
            <Image
              height={250}
              width={"100%"}
              preview={false}
              src={setImageSrc}
              fallback={import.meta.env.VITE_BROKEN_IMAGE_URL}
              style={{ objectFit: setImageObjectFit as any, borderRadius: borderRadiusSM }}
            />
          }
          <div className={previewImageStyles.uploadButtonWrapper}>
            <Upload
              name="file"
              action={""}
              maxCount={1}
              fileList={[]}
              multiple={false}
              showUploadList={false}
              beforeUpload={() => false}
              onChange={onSelectFile}
            >
              <CustomButton
                colorType="active"
                icon={<UploadOutlined />}
                disabled={uploadResults.isLoading}
              >
                Select File
              </CustomButton>
            </Upload>
          </div>
        </div>
      </div>
      <div className={styles.helperText}>
        {renderDoctypeHint}
        <span
          onClick={onClickHelperMessage}
          className={statusMessageClassname}
          style={{ color: statusMessageTextColor }}
        >
          {uploadResults?.statusMessage}
        </span>
      </div>
      {renderProgress}
      <Image
        style={{ display: 'none' }}
        preview={{
          visible: showHiddenPreview,
          scaleStep,
          src: uploadResults.fileResults.url !== "" ? uploadResults.fileResults.url : uploadResults.initialFileData.url,
          onVisibleChange: (value) => {
            setShowHiddenPreview(value);
          },
        }}
      />
    </div>
  );
};