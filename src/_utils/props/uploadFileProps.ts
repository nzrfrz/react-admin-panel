export type fileType = "image" | "non-image";
export type uploadRequestType = "upload" | "delete";
export type uploadResponseType = "no action" | "done" | "on progress" | "success upload" | "success delete" | "error";
export type nonImageAllowedFileType = ".csv" | ".txt" | ".json" | ".pdf" | ".xlsx" | ".docx" | ".pptx" | undefined;

export interface FileResultsProps {
  url: string,
  thumbnailUrl: string,
  fileName: string,
};

export interface UploadResultProps {
  statusCode: number,
  isLoading: boolean,
  uploadProgress: number,
  isImageLoaded: boolean,
  statusAction: uploadResponseType | string,
  canDeleteUploadedFile: boolean,
  statusMessage: string,
  initialFileData: FileResultsProps,
  fileResults: FileResultsProps,
};

export const allowedImageType = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/gif',
];

export const nonImageFileTypeData = [
  {
    extension: ".csv",
    fileType: "text/csv",
  },
  {
    extension: ".txt",
    fileType: "text/plain",
  },
  {
    extension: ".pdf",
    fileType: "application/pdf",
  },
  {
    extension: ".json",
    fileType: "application/json",
  },
  {
    extension: ".xlsx",
    fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  {
    extension: ".docx",
    fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    extension: ".pptx",
    fileType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  }
];

export const initialUploadResultsValue: UploadResultProps = {
  statusCode: 0,
  isLoading: false,
  uploadProgress: 0,
  isImageLoaded: false,
  statusAction: "no action",
  canDeleteUploadedFile: false,
  statusMessage: "File size must below 2MB",
  initialFileData: {
    url: "",
    thumbnailUrl: "",
    fileName: ""
  },
  fileResults: {
    url: "",
    thumbnailUrl: "",
    fileName: ""
  }
};