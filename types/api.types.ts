export type SearchParams = {
  search: string;
};

export interface ApiResponse<T> {
  // meta: {
  //   count?: number;
  // };
  data: T;
  total: number;
}

export type ApiError = {
  details: { error: string; message: string; statusCode: number };
  errorName: string;
  message: string;
  path: string;
  requestId: string;
  statusCode: number;
  timestamp: string;
};
