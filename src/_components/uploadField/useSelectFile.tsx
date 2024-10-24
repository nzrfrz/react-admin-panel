import {
  allowedImageType,
  FileResultsProps,
  fileType,
  initialUploadResultsValue,
  nonImageAllowedFileType,
  nonImageFileTypeData,
  uploadResponseType,
  UploadResultProps,
} from "../../_utils";
import { ApiErrorResponse, ApiSuccessResponse } from "../../_utils/props/apiResponseProps";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useUploadFile } from "./useUploadFile";

export const useSelectFile = (
  uploadFileType: fileType,
  uploadResults: UploadResultProps,
  setUploadResults: React.Dispatch<React.SetStateAction<UploadResultProps>>,
  uploadApiEndpoint: string,
  deleteApiEndpoint: string,
  nonImageAllowedFileType: nonImageAllowedFileType,
) => {

  const {
    handleDeleteFile,
    handleUploadFile,
  } = useUploadFile(uploadApiEndpoint, deleteApiEndpoint, setUploadResults);

  const handleUploadResponse = (
    responseType: uploadResponseType,
    uploadResponse?: ApiSuccessResponse<UploadResultProps> | undefined,
    errorResponse?: ApiErrorResponse<{ data: { status: number, message: string } }> | undefined,
  ) => {
    switch (responseType) {
      case "on progress":
        setUploadResults((prev) => {
          return {
            ...prev,
            statusCode: 0,
            isLoading: true,
            uploadProgress: 0,
            statusAction: "uploading",
            canDeleteUploadedFile: false,
            statusMessage: "Upload in progress..."
          }
        });
        break;
      case "success upload":
        setUploadResults((prev) => {
          return {
            ...prev,
            isLoading: false,
            uploadProgress: 0,
            statusAction: "done",
            canDeleteUploadedFile: true,
            statusCode: uploadResponse?.status as number,
            statusMessage: uploadResponse?.data.fileResults.fileName as string,
            fileResults: uploadResponse?.data.fileResults as FileResultsProps,
          }
        });
        break;
      case "success delete":
        setUploadResults({ ...initialUploadResultsValue });
        break;
      case "error":
        setUploadResults((prev) => {
          return {
            ...prev,
            isLoading: false,
            statusAction: "error",
            statusCode: errorResponse?.status as number,
            statusMessage: errorResponse?.response.data.data.message as string,
          }
        });
        break;
      default:
        setUploadResults({ ...initialUploadResultsValue });
        break;
    }
  };

  const handleSelectImage = async (fileInfo: UploadChangeParam<UploadFile<any>>) => {
    handleUploadResponse("on progress", undefined);
    const fileData = fileInfo.fileList[fileInfo.fileList.length - 1];

    const isFileTypeAllowed = allowedImageType.includes(fileData.type as string);
    const isFileSizeAllowed = fileData.size as number / 1024 / 1024 < 2;

    switch (false) {
      case isFileTypeAllowed:
        setUploadResults((prev) => {
          return {
            ...prev,
            isLoading: false,
            statusCode: 400,
            statusAction: "error",
            canDeleteUploadedFile: true,
            statusMessage: "File type not allowed!!",
          }
        });
        break;
      case isFileSizeAllowed:
        setUploadResults((prev) => {
          return {
            ...prev,
            isLoading: false,
            statusCode: 400,
            statusAction: "error",
            canDeleteUploadedFile: true,
            statusMessage: "Max file size 2MB!!",
          }
        });
        break;
      default:
        try {
          if (uploadResults.canDeleteUploadedFile === true) {
            await handleDeleteFile(uploadResults.fileResults.fileName);
          }

          const formDataPayload = fileInfo.fileList[0].originFileObj;
          let formData = new FormData();
          formData.append("file", formDataPayload as Blob);
          const uploadFileResults = await handleUploadFile(formData);
          // console.warn("\n upload file results: \n", uploadFileResults);
          handleUploadResponse("success upload", uploadFileResults);
        } catch (error) {
          // console.error("\n upload file error: \n", error);          
          handleUploadResponse("error", error as any);
        }
        break;
    }
  };

  const handleSelectNonImage = async (fileInfo: UploadChangeParam<UploadFile<any>>) => {
    handleUploadResponse("on progress", undefined);
    const fileData = fileInfo.fileList[fileInfo.fileList.length - 1];
    const setFileTypeAllowed = nonImageFileTypeData.find((fileData) => fileData.extension === nonImageAllowedFileType)?.fileType;
    const isFileTypeAllowed = fileData.type === "" ? false : setFileTypeAllowed?.includes(fileData.type as string);
    const isFileSizeAllowed = fileData.size as number / 1024 / 1024 < 2;

    switch (false) {
      case isFileTypeAllowed:
        setUploadResults((prev) => {
          return {
            ...prev,
            isLoading: false,
            statusCode: 400,
            statusAction: "error",
            canDeleteUploadedFile: true,
            statusMessage: "File type not allowed!!",
          }
        });
        break;
      case isFileSizeAllowed:
        setUploadResults((prev) => {
          return {
            ...prev,
            isLoading: false,
            statusCode: 400,
            statusAction: "error",
            canDeleteUploadedFile: true,
            statusMessage: "Max file size 2MB!!",
          }
        });
        break;
      default:
        try {
          if (uploadResults.canDeleteUploadedFile === true) {
            await handleDeleteFile(uploadResults.fileResults.fileName);
          }

          const formDataPayload = fileInfo.fileList[0].originFileObj;
          let formData = new FormData();
          formData.append("file", formDataPayload as Blob);
          const uploadFileResults = await handleUploadFile(formData);
          // console.warn("\n upload file results: \n", uploadFileResults);
          handleUploadResponse("success upload", uploadFileResults);
        } catch (error) {
          // console.error("\n upload file error: \n", error);
          handleUploadResponse("error", undefined, error as ApiErrorResponse<{ data: { status: number, message: string } }>);
        }
        break;
    }
  };

  function onSelectFile(fileInfo: UploadChangeParam<UploadFile<any>>) {
    if (uploadFileType === "non-image") return handleSelectNonImage(fileInfo);
    else return handleSelectImage(fileInfo);
  };

  return { onSelectFile };
};