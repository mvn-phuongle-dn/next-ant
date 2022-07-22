// import { defaultPaginationParams } from "@app/constants/api.constants";

import { getOrderByExtraction } from "./table.helper";

export const convertApiParams = (params: any, addPaginationParam = false) => {
  const {
    // page = defaultPaginationParams.page,
    // pageSize = defaultPaginationParams.pageSize,
    orderBy,
    ...rest
  } = params;

  const newParams = {
    ...(addPaginationParam
      ? { limit: rest.pageSize, offset: (rest.page - 1) * rest.pageSize }
      : {}),
    ...rest,
  };

  if (orderBy) {
    const orderParams = getOrderByExtraction(orderBy);
    newParams.orderBy = orderParams.key;
    newParams.orderType = orderParams.direction === "descend" ? "DESC" : "ASC";
  }

  return newParams;
};
