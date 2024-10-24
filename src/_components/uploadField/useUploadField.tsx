import { useCallback, useEffect, useMemo, useState } from "react";
import { fileType, initialUploadResultsValue, nonImageAllowedFileType, UploadResultProps } from "../../_utils";

import { Progress, theme } from "antd";

export const useUploadField = (
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
    if (previewImage === false && toUploadFileType === "image" && uploadResults.statusAction !== "error") return styles.statusMessage;
    return undefined;
  }, [uploadResults, previewImage, toUploadFileType]);

  const onClickHelperMessage = useCallback(() => {
    if (uploadResults.statusAction === "error") return;
    else if (previewImage === false && toUploadFileType !== "image") return;
    else if (previewImage === true && toUploadFileType === "image") return;
    return setShowHiddenPreview(true);
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

  useEffect(() => {
    setUploadResults({...initialUploadResultsValue});
  }, [toUploadFileType]);
  console.log("\nupload results: \n", setImageSrc);

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
  };
};