import { useContext } from "react";
import { GlobalContext } from "../../context/contextCreate";

import { QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "../props/apiResponseProps";
import { privateRequest, publicRequest } from "./axiosInstance";

type httpMethodTypes = "post" | "put" | "patch" | "delete";
type requestType = "public" | "private";

export const useMutationHook = <T>(
  urlPath: string,
  requestType: requestType,
  httpMethod: httpMethodTypes,
  refetchUrlPath?: string | undefined,
  refetchQueryKey?: (string | number)[] | QueryFilters | undefined,
  onSuccessMutate?: () => void | undefined,
  onErrorMutate?: (error: ApiErrorResponse<T>) => void | Promise<void> | undefined,
) => {
  const queryClient = useQueryClient();
  const {openNotification} = useContext(GlobalContext);

  const setRequest = async <T>(payload: T) => {
    let results;
    // console.log("set request mutation hook: \n", payload);
    
    switch (httpMethod) {
      case "post":
        results = requestType === "public" ? await publicRequest.post(urlPath, payload) : await privateRequest.post(urlPath, payload);
        return results.data;
      case "put":
        results = requestType === "public" ? await publicRequest.put(urlPath, payload) : await privateRequest.put(urlPath, payload);
        return results.data;
      case "patch":
        results = requestType === "public" ? await publicRequest.patch(urlPath, payload) : await privateRequest.patch(urlPath, payload);
        return results.data;
      default:
        results = requestType === "public" ? await publicRequest.delete(urlPath) : await privateRequest.delete(urlPath);
        return results.data;
    }
  };

  const fetchFn = async (): Promise<T> => {
    const response = await publicRequest.get(refetchUrlPath as string);
    return response.data;
  };

  async function refetchQuery () {
    return await queryClient.fetchQuery({
      queryKey: refetchQueryKey as (string | number)[],
      queryFn: () => fetchFn(),
      retry: (_, error: ApiErrorResponse) => {
        // Retry on failure unless it's a 401 (unauthorized) error
        return error.status !== 401;
      },
    });
  };

  const mutation = useMutation<ApiSuccessResponse<T>, ApiErrorResponse<T>, T>({
    mutationFn: setRequest,
    onMutate: () => {
      openNotification("info", "action", "Action Info", "Action is in progress ...!");
    },
    onSuccess: async (data: ApiSuccessResponse<T>) => {
      queryClient.removeQueries(refetchQueryKey as QueryFilters);
      openNotification("success", "action", "Action Success", data.message);
      onSuccessMutate && onSuccessMutate();
      await refetchQuery();
      // console.log("\nmutation success: \n", data);
    },
    onError: async (error: ApiErrorResponse<T>) => {
      openNotification("error", "action", "Action Error", error.response.data.message);
      onErrorMutate && onErrorMutate(error);
      // console.log("\nmutation error: \n", error.response.data.message);
    },
    retry: 1,
  });

  return mutation;
};