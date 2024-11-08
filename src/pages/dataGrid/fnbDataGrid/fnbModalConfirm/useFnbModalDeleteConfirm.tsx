import { useContext, useState } from "react";
import { FnbContext } from "../fnbContext/fnbContextCreate";
import { useUploadFile } from "../../../../_components/uploadField/useUploadFile";
import { initialUploadResultsValue, UploadResultProps, useMutationHook } from "../../../../_utils";

export const useFnbModalDeleteConfirm = () => {
  const [uploadResults, setUploadResults] = useState<UploadResultProps>(initialUploadResultsValue);

  const {
    page,
    limitPerPage,
    searchValue,
    selectedRowData,
    setIsDetailDrawerOpen,
    setModalDeleteConfirmOpen,
    selectedFilterStatus,
  } = useContext(FnbContext);

  const { handleDeleteFile } = useUploadFile(
    import.meta.env.VITE_FNB_UPLOAD_IMAGE_ENDPOINT,
    import.meta.env.VITE_FNB_DELETE_IMAGE_ENDPOINT,
    setUploadResults,
  );

  function onSuccessMutate() {
    setModalDeleteConfirmOpen && setModalDeleteConfirmOpen(false);
    setIsDetailDrawerOpen && setIsDetailDrawerOpen(false);
  };

  function onErrorMutate() {
    setModalDeleteConfirmOpen && setModalDeleteConfirmOpen(false);
  };

  const mutateAction = useMutationHook(
    `/api/fnb/delete/id=${selectedRowData?.id}/`,
    "public",
    "delete",
    `/api/fnb/get?page=${page}&limit=${limitPerPage}&status=${selectedFilterStatus}&q=${searchValue}`,
    ["fnbList", page as number, limitPerPage as number, selectedFilterStatus, searchValue as string],
    onSuccessMutate,
    onErrorMutate,
  );

  async function onDeleteFooterButton() {
    if (selectedRowData !== undefined) await handleDeleteFile(selectedRowData?.image.fileName);
    mutateAction.mutateAsync(selectedRowData);
  };

  return {
    onDeleteFooterButton,
    isActionInProgress: mutateAction.isPending || uploadResults.isLoading,
  };
};