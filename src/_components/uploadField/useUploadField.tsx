import { useCallback, useEffect, useMemo, useState } from "react";
import { fileType, initialUploadResultsValue, nonImageAllowedFileType, UploadResultProps } from "../../_utils";

import { FormInstance, Progress, theme } from "antd";

export const useUploadField = (
  formInstance: FormInstance | undefined,
  formItemName: string | undefined,
  uploadResults: UploadResultProps,
  setUploadResults: React.Dispatch<React.SetStateAction<UploadResultProps>>,
  styles: CSSModuleClasses,
  previewImage: boolean,
  toUploadFileType: fileType,
  docType: nonImageAllowedFileType,
) => {

  const [showHiddenPreview, setShowHiddenPreview] = useState(false);
  const [scaleStep, setSscaleStep] = useState(0.2);

  const isImageFileType = toUploadFileType === "image";
  const previewImageRendered = isImageFileType && previewImage;
  const formHelperMessage = formInstance?.getFieldError(formItemName)[0];  

  const {
    token: {
      colorTextPlaceholder,
      colorSuccess,
      colorError,
    },
  } = theme.useToken();

  const previewImageStyles = useMemo(() => {
    return {
      container: previewImage === false || !previewImageRendered ? styles.containerNoImage : styles.container,
      uploadWrapper: previewImage === false || !previewImageRendered ? styles.uploadWrapperNoImage : styles.uploadWrapper,
      uploadButtonWrapper: previewImage === false || !previewImageRendered ? styles.uploadButtonWrapperNoImage : styles.uploadButtonWrapper,
    }
  }, [styles, previewImage, previewImageRendered]);

  const statusMessageClassname = useMemo(() => {
    if (previewImage === false && toUploadFileType === "image" && uploadResults.statusAction !== "error" && uploadResults.fileResults.url !== "") return styles.statusMessage;
    return styles.generalStatusMessage;
  }, [styles, uploadResults, previewImage, toUploadFileType]);
  // console.log(statusMessageClassname);  

  const onClickHelperMessage = useCallback(() => {
    switch (true) {
      case uploadResults.statusAction === "error":
      case uploadResults.fileResults.url === "":
      case toUploadFileType === "non-image":
      case previewImage === false && toUploadFileType !== "image":
      case previewImage === true && toUploadFileType === "image":
        return;
      default:
        return setShowHiddenPreview(true);
    }
  }, [uploadResults, previewImage, toUploadFileType]);

  const statusMessageTextColor = useMemo(() => {
    switch (uploadResults?.statusAction) {
      case "error":
        return colorError;
      case "done":
        return colorSuccess;
      default:
        return colorTextPlaceholder;
    }
  }, [uploadResults, colorError, colorSuccess, colorTextPlaceholder]);

  const renderDoctypeHint = useMemo(() => {
    if (toUploadFileType === "non-image" && !docType) {
      return (
        <span style={{ color: colorError }}><code>docType</code> required.</span>
      );
    }
  }, [toUploadFileType, docType]);

  const renderProgress = useMemo(() => {
    if (uploadResults?.isLoading === true && uploadResults.uploadProgress !== 0) {
      return (
        <Progress percent={uploadResults.uploadProgress} />
      );
    }
  }, [uploadResults]);

  const setImageSrc = useMemo(() => {
    if (uploadResults.fileResults.url !== "" && uploadResults.initialFileData.url !== "") return uploadResults.fileResults.url;
    else if (uploadResults.fileResults.url !== "" && uploadResults.initialFileData.url === "") return uploadResults.fileResults.url;
    else if (uploadResults.fileResults.url === "" && uploadResults.initialFileData.url !== "") return uploadResults.initialFileData.url;
    return import.meta.env.VITE_DEFAULT_IMAGE_URL;
  }, [uploadResults]);

  const setImageObjectFit = useMemo<string>(() => {
    if (uploadResults.fileResults.url !== "" && uploadResults.initialFileData.url !== "") return "cover";
    else if (uploadResults.fileResults.url !== "" && uploadResults.initialFileData.url === "") return "cover";
    else if (uploadResults.fileResults.url === "" && uploadResults.initialFileData.url !== "") return "cover";
    return "contain";
  }, [uploadResults]);

  useEffect(() => {
    setUploadResults({ ...initialUploadResultsValue });
  }, [toUploadFileType]);

  useEffect(() => {
    setUploadResults((prev) => {
      return {
        ...prev,
        statusAction: formHelperMessage === undefined ? "" : "error",
        statusMessage: formHelperMessage === undefined ? prev.statusMessage : formHelperMessage as string,
      }
    });
  }, [formHelperMessage]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--clrDashedBorder', uploadResults.statusAction !== "error" ? "#9aacb3" : colorError);
  }, [colorError, uploadResults]);
  // console.log("\nset object fit: \n", setImageObjectFit);
  // console.log("\nupload results: \n", uploadResults);

  return {
    previewImageStyles,
    statusMessageTextColor,
    previewImageRendered,
    renderDoctypeHint,
    renderProgress,
    setImageSrc,
    statusMessageClassname,
    showHiddenPreview, setShowHiddenPreview,
    scaleStep, setSscaleStep,
    onClickHelperMessage,
    setImageObjectFit,
  };
};