import { useContext, useEffect, useMemo, useState } from "react";
import { FnbContext } from "../fnbContext/fnbContextCreate";
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  FileResultsProps,
  FnbCategoryProps,
  FnBProps,
  initialUploadResultsValue,
  UploadResultProps,
  useMutationHook,
  useQueryHook
} from "../../../../_utils";
import { isEqual } from "lodash";
import { GlobalContext } from "../../../../context/contextCreate";
import { useUploadFile } from "../../../../_components/uploadField/useUploadFile";

export const useFnbForm = () => {
  const {
    openNotification
  } = useContext(GlobalContext);

  const [uploadResults, setUploadResults] = useState<UploadResultProps>(initialUploadResultsValue);
  const [formItemStatus, setFormItemStatus] = useState<"AVAILABLE" | "UNAVAILABLE" | string>("");
  // console.log("\n upload results: \n", uploadResults);
  // console.log("\n form value changes: \n", formValueChanges);

  const {
    form,
    page,
    setPage,
    limitPerPage,
    searchValue,
    formMode,
    selectedRowData,
    setIsFormDrawerOpen,
    selectedCategoryFilter,
    selectedPriceFilter,
    selectedFilterStatus,
  } = useContext(FnbContext);

  const {handleDeleteFile} = useUploadFile(
    import.meta.env.VITE_FNB_UPLOAD_IMAGE_ENDPOINT,
    import.meta.env.VITE_FNB_DELETE_IMAGE_ENDPOINT,
    setUploadResults,
  );

  const fnbCategoriesQ = useQueryHook<ApiSuccessResponse<FnbCategoryProps>>(
    false,
    `/api/fnb-category/get/`,
    ["fnbCategories"],
    1440, // in minutes
  );

  const fnbCategoriesSelectOptions = useMemo(() => {
    if (fnbCategoriesQ.data === undefined) return [];
    return fnbCategoriesQ.data?.data.map((category: FnbCategoryProps) => {
      return {
        label: category.title,
        value: category.id,
        slug: category.slug,
      }
    })
  }, [fnbCategoriesQ.data]);

  const onSuccessMutate = () => {
    setIsFormDrawerOpen && setIsFormDrawerOpen(false);
    if (formMode === "add" && page !== 1) return setPage && setPage(1);
  };

  const onErrorMutate = async (error: ApiErrorResponse) => {
    if (error.status === 403) {
      if (uploadResults.fileResults.fileName !== "") {
        await handleDeleteFile(uploadResults.fileResults.fileName);
      }

      setUploadResults({
        ...initialUploadResultsValue,
        initialFileData: selectedRowData?.image as FileResultsProps
      });
      form?.setFieldsValue({
        name: selectedRowData?.name,
        description: selectedRowData?.description,
        image: selectedRowData?.image,
        price: selectedRowData?.price,
        category: selectedRowData?.category?.id,
        status: selectedRowData?.status,
      });
    }
    // console.log("\non error mutate: \n", error);
  };
  // console.log("\n form mode: \n", selectedRowData);

  const mutateAction = useMutationHook(
    formMode === "add" ? "/api/fnb/insert/" : `/api/fnb/update/id=${selectedRowData?.id}/`,
    "public",
    formMode === "add" ? "post" : "put",
    `/api/fnb/get?page=${page}&limit=${limitPerPage}&category=${selectedCategoryFilter}&priceFilter=${selectedPriceFilter}&status=${selectedFilterStatus}&q=${searchValue}`,
    ["fnbList", page as number, limitPerPage as number, selectedPriceFilter, selectedFilterStatus, selectedCategoryFilter, searchValue as string],
    onSuccessMutate,
    onErrorMutate,
  );

  const formChangesDetector = async (formData: FnBProps) => {
    const { id, category, ...rest } = selectedRowData || {};
    const initialValue = {
      ...rest,
      category: {
        id: selectedRowData?.category?.id as string,
      }
    };
    // console.log("\n initial value: \n", selectedRowData);

    if (isEqual(initialValue, formData)) {
      // console.log("\n no changes detected");
      openNotification("info", "action", "Action Info", "No changes detected ...!");
      setIsFormDrawerOpen && setIsFormDrawerOpen(false);
      // setIsFormChangeDetected && setIsFormChangeDetected(false);
    }
    else {
      // console.log("\n changes detected");
      const initialFileDataName = uploadResults.initialFileData.fileName;
      const uploadResultsFileName = uploadResults.fileResults.fileName;
      mutateAction.mutateAsync(formData);
      if (formMode === "edit" && initialFileDataName !== "" && uploadResultsFileName !== "") {
        await handleDeleteFile(uploadResults.initialFileData.fileName);
      }
      // if (uploadResults.initialFileData.fileName !== "") {
      //   await handleDeleteFile(uploadResults.initialFileData.fileName);
      // }
    }
  };

  async function handleSaveForm() {
    form?.validateFields()
      .then((values) => {
        const payload = {
          ...values,
          category: {
            id: values.category
          },
          image: {
            url: uploadResults.fileResults.url === "" ? uploadResults.initialFileData.url : uploadResults.fileResults.url,
            thumbnailUrl: uploadResults.fileResults.url === "" ? uploadResults.initialFileData.thumbnailUrl : uploadResults.fileResults.thumbnailUrl,
            fileName: uploadResults.fileResults.fileName === "" ? uploadResults.initialFileData.fileName : uploadResults.fileResults.fileName
          },
          status: values.status
        }

        formChangesDetector(payload);
        // console.log("\nsave cliked: \n", payload);
      })
      .catch(() => {
        // console.log("\n form error: \n", error);
        return false
      });
  };

  // initiate form for editing or add new
  useEffect(() => {

    if (formMode === "edit") {
      setUploadResults({
        ...initialUploadResultsValue,
        initialFileData: selectedRowData?.image as FileResultsProps
      });
      form?.setFieldsValue({
        name: selectedRowData?.name,
        description: selectedRowData?.description,
        image: selectedRowData?.image,
        price: selectedRowData?.price,
        category: selectedRowData?.category?.id,
        status: selectedRowData?.status,
      });

      return;
    }
    else {
      setUploadResults(initialUploadResultsValue);
      setFormItemStatus("AVAILABLE");
      form?.setFieldsValue({
        status: "AVAILABLE",
      });
      return;
    }
  }, [form, formMode, selectedRowData]);

  return {
    handleSaveForm,
    fnbCategoriesSelectOptions,
    uploadResults, setUploadResults,
    formItemStatus, setFormItemStatus,
    isActionInProgress: fnbCategoriesQ.isFetching || mutateAction.isPending,
  };
};