import { PaginationProps } from "antd";

// TODO: Remove this type
export type ResponsePaginationDef = {
  page: number;
  perPage: number;
};

export type TablePaginationDef = Pick<PaginationProps, "current" | "pageSize">;
