import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiErrorResponse } from "../props/apiResponseProps";
import { privateRequest, publicRequest } from "..";

export const useQueryHook = <T>(
  fetchWithCredential: boolean,
  fetchPath: string,
  queryKey: (string | number)[],
  staleTime: number, // in minutes,
) => {
  const fetchData = async (): Promise<T> => {
    let response;
    if (fetchWithCredential === true) response = await privateRequest.get(fetchPath);
    else response = await publicRequest.get(fetchPath);
    return response?.data;
  };

  const query = useQuery<T, ApiErrorResponse>({
    queryKey,
    queryFn: () => fetchData(),
    staleTime: staleTime && staleTime * 60 * 1000,
    placeholderData: keepPreviousData,
    retry: (_, error) => {
      // Retry on failure unless it's a 401 (unauthorized) error
      return error.response?.status !== 401;
    },
  });

  return query;
};