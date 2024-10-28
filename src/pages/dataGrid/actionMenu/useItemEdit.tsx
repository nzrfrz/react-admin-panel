import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DataGridContext } from "../../../context/contextCreate";
import {
  FileResultsProps,
  FnbCategoryProps,
  FnBFormValuesProps,
  initialUploadResultsValue,
  UploadResultProps,
  useQueryHook
} from "../../../_utils";
import { ApiSuccessResponse } from "../../../_utils/props/apiResponseProps";
import { isEqual } from "lodash";
import { useUploadFile } from "../../../_components/uploadField/useUploadFile";

export const useItemEdit = () => {
  const [uploadResults, setUploadResults] = useState<UploadResultProps>(initialUploadResultsValue);
  const [productStatus, setProductStatus] = useState<"AVAILABLE" | "UNAVAILABLE" | string>("AVAILABLE");

  const [formValueChanges, setFormValueChanges] = useState<FnBFormValuesProps | undefined>(undefined);

  const {
    form,
    activeTabkey,
    selectedRowData,
    setActiveTabkey,
    setSelectedRowData,
    setIsActionDrawerOpen,
    setIsFormChangeDetected,
    setIsModalConfirmOpen,
    modalConfirmType,
    setModalConfirmType,
  } = useContext(DataGridContext);

  const { handleDeleteFile } = useUploadFile(
    import.meta.env.VITE_FNB_UPLOAD_IMAGE_ENDPOINT,
    import.meta.env.VITE_FNB_DELETE_IMAGE_ENDPOINT,
    setUploadResults,
  );

  function resetActionMenuState() {
    setIsActionDrawerOpen && setIsActionDrawerOpen((prev) => { return !prev });
    setTimeout(() => {
      setSelectedRowData && setSelectedRowData(undefined);
      setActiveTabkey && setActiveTabkey("detail");
      // form?.resetFields();
    }, 100);
  };

  const _handleDeleteFile = useCallback(async () => {
    try {
      return await new Promise(async (resolve, reject) => {
        if (uploadResults.fileResults.fileName === "") reject;
        const results = await handleDeleteFile(uploadResults.fileResults.fileName);
        setUploadResults(initialUploadResultsValue);
        resetActionMenuState();
        resolve(results);
        // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      });
    } catch {
      return console.log('Oops errors!');
    }
    
    // if (uploadResults.fileResults.fileName === "") {
    //   return resetActionMenuState();
    // }
    // else {
    //   try {
    //     const results = await handleDeleteFile(uploadResults.fileResults.fileName);
    //     setUploadResults(initialUploadResultsValue);
    //     resetActionMenuState();
    //     console.warn(results);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  }, [uploadResults]);

  const onModalConfirmFooterButtonClick = useCallback(async () => {
    if (modalConfirmType === "form changes detection") {
      console.log(uploadResults.fileResults.fileName);      
    }
    else {
      return;
    }
  }, [uploadResults, modalConfirmType]);

  /*
  async function _handleDeleteFile() {
    if (uploadResults.fileResults.fileName === "") {
      return resetActionMenuState();
    }
    else {
      try {
        const results = await handleDeleteFile(uploadResults.fileResults.fileName);
        setUploadResults(initialUploadResultsValue);
        resetActionMenuState();
        console.warn(results);
      } catch (error) {
        console.error(error);
      }
    }
  };
  */
  // console.log("\nupload results: \n", uploadResults.fileResults.fileName);
  // console.log("\nform initial: \n", initialFormValues);

  const fnbCategoriesQ = useQueryHook<ApiSuccessResponse<FnbCategoryProps>>(
    false,
    `/api/fnb-category/get/`,
    ["fnbCategories"],
    10, // in minutes
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

  // set initial form values
  useEffect(() => {
    if (activeTabkey === "detail") return;

    setUploadResults({
      ...initialUploadResultsValue,
      initialFileData: selectedRowData?.image as FileResultsProps
    });
    form?.setFieldsValue({
      name: selectedRowData?.name,
      description: selectedRowData?.description,
      price: selectedRowData?.price,
      category: selectedRowData?.category?.id.toString()
    });
    setProductStatus(selectedRowData?.status as string);

    const { id, ...rest } = selectedRowData || {};
    setFormValueChanges({
      ...rest,
      category: selectedRowData?.category?.id as string,
    } as FnBFormValuesProps);
  }, [form, selectedRowData]);

  // Track edit form values changes.
  useEffect(() => {
    if (activeTabkey === "detail") return;

    const { id, ...rest } = selectedRowData || {};
    const prevData = {
      ...rest,
      category: selectedRowData?.category?.id,
    };

    const currentData = {
      ...formValueChanges,
      image: {
        url: uploadResults.fileResults.url === "" ? uploadResults.initialFileData.url : uploadResults.fileResults.url,
        thumbnailUrl: uploadResults.fileResults.url === "" ? uploadResults.initialFileData.thumbnailUrl : uploadResults.fileResults.thumbnailUrl,
        fileName: uploadResults.fileResults.fileName === "" ? uploadResults.initialFileData.fileName : uploadResults.fileResults.fileName
      },
      category: formValueChanges?.category,
      status: productStatus,
    };

    if (isEqual(currentData, prevData)) {
      setIsFormChangeDetected && setIsFormChangeDetected(false);
    }
    else {
      setIsFormChangeDetected && setIsFormChangeDetected(true);
    }

  }, [selectedRowData, formValueChanges, productStatus, uploadResults]);

  return {
    uploadResults,
    setUploadResults,
    fnbCategoriesSelectOptions,
    productStatus, setProductStatus,
    formValueChanges, setFormValueChanges,
    _handleDeleteFile, // not sure
    resetActionMenuState,
    onModalConfirmFooterButtonClick,
  };
};