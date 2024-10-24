export interface PaginatedMetaProps {
  page: number,
  limit: number,
  totalPage: number,
};

export interface ApiSuccessResponse<T = unknown> {
  status: number,
  message: string,
  data: T,
};

export interface ApiErrorResponse<T = unknown> {
  status: number,
  message: string,
  response: {
    status: number,
    message: string,
    data: T,
  }
};