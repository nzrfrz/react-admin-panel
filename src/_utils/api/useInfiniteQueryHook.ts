import { useInfiniteQuery } from "@tanstack/react-query";
import { ApiErrorResponse } from "../props/apiResponseProps";
import { privateRequest, publicRequest } from "..";

export const useInfiniteQueryHook = <T>(
  fetchWithCredential: boolean,
  fetchBasePath: string, // without pagination query params
  additionalQueryParams: string,
  queryKey: (string | number)[],
  pageLimit: number,
  staleTime: number, // in minutes,
  getNextPageParamFn: (lastPage: T) => void,
) => {

  const fetchData = async ({pageParam}: {pageParam: number}): Promise<T> => {
    let response;
    const fetchPath = `${fetchBasePath}page=${pageParam}&limit=${pageLimit}${additionalQueryParams}`;
    if (fetchWithCredential === true) response = await privateRequest.get(fetchPath);
    else response = await publicRequest.get(fetchPath);

    return response.data;
  };

  const query = useInfiniteQuery<T, ApiErrorResponse>({
    queryKey,
    queryFn: fetchData as any,
    staleTime: staleTime && staleTime * 60 * 1000,
    initialPageParam: 1, // Default to 1 for pagination
    getNextPageParam: (lastPage) => {
      return getNextPageParamFn(lastPage);
    },
    retry: (_, error) => {
      return error.status !== 401; // Retry logic for non-401 errors
    },
  });  

  return query;
};