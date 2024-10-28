import { publicRequest, UploadResultProps } from "../../_utils";

export const useUploadFile = (
  uploadApiEndpoint: string,
  deleteApiEndpoint: string,
  setUploadResults: React.Dispatch<React.SetStateAction<UploadResultProps>>,
) => {
  // console.log("\n use upload file: \n", uploadApiEndpoint);

  const handleUploadFile = async (formData: FormData) => {
    const response = await publicRequest.post(
      uploadApiEndpoint,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          if (!total) return;
          let precentage = Math.floor((loaded * 100) / total);
          setUploadResults((prev) => { return { ...prev, uploadProgress: precentage } });
        },
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  };

  const handleDeleteFile = async (fileName: string) => {
    console.log("\n delete file -- file name: \n", fileName);
    
    const response = await publicRequest.delete(`${deleteApiEndpoint}${fileName}`);
    return response.data;
  };

  return {
    handleDeleteFile,
    handleUploadFile,
  };
};