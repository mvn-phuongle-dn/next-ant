import { Key } from "react";

import { SortOrder } from "antd/lib/table/interface";

import {
  TablePaginationDef,
  ResponsePaginationDef,
} from "../types/pagination.types";
import { OrderByDef } from "../types/table.types";

/** The divider used in the url for the orderBy search param */
const ORDER_BY_DIVIDER = "_";

/**
 * Takes the raw orderBy string from the search query
 * and splits it and extracts key and direction
 */
export const getOrderByExtraction = (orderBy: string): OrderByDef => {
  const orderBySplit = orderBy.split(ORDER_BY_DIVIDER);
  const orderByKey = orderBySplit?.[0] || "";
  const orderByDirection = (orderBySplit?.[1] || undefined) as
    | SortOrder
    | undefined;

  const orderByExtraction: OrderByDef = {
    key: orderByKey,
    direction: orderByDirection,
  };

  return orderByExtraction;
};

/**
 * Takes the orderBy key and direction
 * and combines them to a single string for the search query
 */
export const getOrderBy = (orderByKey: string, orderByDirection: SortOrder) => {
  return `${orderByKey}${ORDER_BY_DIVIDER}${orderByDirection}`;
};

/**
 * Map pagination from API to Ant Design pagination
 */
export const mapPagination = (
  pagination: ResponsePaginationDef
): TablePaginationDef => {
  return {
    current: pagination?.page ?? undefined,
    pageSize: pagination?.perPage ?? undefined,
  };
};

/**
 * Get sorted table columns
 */
export const getSortedTableColumns = <T extends { key?: Key }>(
  columns: T[] = [],
  sortedColumnKeys: string[] = []
) => {
  return columns
    .filter(col => sortedColumnKeys.indexOf(col.key?.toString() ?? "") > -1)
    .sort((col1, col2) =>
      sortedColumnKeys.indexOf(col1.key?.toString() ?? "") >
      sortedColumnKeys.indexOf(col2.key?.toString() ?? "")
        ? 1
        : -1
    );
};
