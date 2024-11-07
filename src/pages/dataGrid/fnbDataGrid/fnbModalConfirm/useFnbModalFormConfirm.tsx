import { useContext, useState } from "react";
import { FnbContext } from "../fnbContext/fnbContextCreate";
import { initialUploadResultsValue, UploadResultProps } from "../../../../_utils";
import { useUploadFile } from "../../../../_components/uploadField/useUploadFile";

export const useFnbModalFormConfirm = () => {
  const [uploadResults, setUploadResults] = useState<UploadResultProps>(initialUploadResultsValue);
  
  const {
    form,
    formMode,
    selectedRowData,
    setIsFormDrawerOpen,
    setModalFormConfirmOpen,
  } = useContext(FnbContext);

  const { handleDeleteFile } = useUploadFile(
    import.meta.env.VITE_FNB_UPLOAD_IMAGE_ENDPOINT,
    import.meta.env.VITE_FNB_DELETE_IMAGE_ENDPOINT,
    setUploadResults,
  );

  const onFooterButtonClick = async () => {
    if (formMode === "add") {
      const formInstanceValue = form?.getFieldsValue();
      // console.log(formInstanceValue);
      setModalFormConfirmOpen && setModalFormConfirmOpen(false);
      setIsFormDrawerOpen && setIsFormDrawerOpen(false);
      form?.resetFields();
      if (formInstanceValue.image !== undefined) await handleDeleteFile(formInstanceValue.image.fileName);
    }
    else {
      const initialImageValue = selectedRowData?.image;
      const formInstanceValue = form?.getFieldsValue();
      setModalFormConfirmOpen && setModalFormConfirmOpen(false);
      setIsFormDrawerOpen && setIsFormDrawerOpen(false);
      form?.resetFields();
      if (initialImageValue?.fileName !== formInstanceValue.image.fileName) {
        await handleDeleteFile(formInstanceValue.image.fileName);
      }
    }
  };
  
  return {
    uploadResults,
    onFooterButtonClick,
  };
};