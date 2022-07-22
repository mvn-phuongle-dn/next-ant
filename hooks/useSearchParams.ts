import { useCallback, useEffect, useState } from "react";

import _toInteger from "lodash/toInteger";
import { useRouter } from "next/router";
import qs, { ParseOptions, StringifyOptions } from "query-string";

import { ItemModalEnum } from "../constants/route.constants";
import { getOrderByExtraction } from "../helpers/table.helper";
import { OrderByDef } from "../types/table.types";

const ARRAY_FORMAT: StringifyOptions["arrayFormat"] = "bracket";
const QUERY_OPTIONS: StringifyOptions = {
  arrayFormat: ARRAY_FORMAT,
  skipEmptyString: true,
};
export const PARSE_OPTIONS: ParseOptions = {
  arrayFormat: ARRAY_FORMAT,
  parseBooleans: true,
};

export enum OrderTypesEnum {
  asc = "ASC",
  desc = "DESC",
}

/**
 * The reason for the generic type being wrapped in Partial,
 * is that we want to be able to update the search params one
 * parameter at a time. As we have no other way of forcing generics
 * passed to the hook to always have optional properties, we can wrap
 * it in Partial, and declare that we do not "care" if a property
 * in the generic type passed in contains a mandatory property.
 */
export type SearchParamDef<T = {}> = Partial<T> & {
  action?: ItemModalEnum;
  entryId?: string;
  entryType?: string;
  orderBy?: string;
  orderByExtracted?: OrderByDef;
  page?: number;
  pageSize?: number;
  search?: string;
};

const useSearchParams = <T = {}>() => {
  const router = useRouter();

  const getCurrentSearch = useCallback(() => {
    const currentSearch = qs.parse(
      qs.stringify(router.query, PARSE_OPTIONS),
      PARSE_OPTIONS
    ) as SearchParamDef as SearchParamDef<T>;
    currentSearch.orderByExtracted = getOrderByExtraction(
      (currentSearch.orderBy as string) || ""
    );
    currentSearch.page = _toInteger(currentSearch.page) || 1;
    currentSearch.pageSize = _toInteger(currentSearch.pageSize) || undefined;
    return currentSearch;
  }, [router.query]);

  const [search, setSearch] = useState<SearchParamDef<T>>(getCurrentSearch());

  useEffect(() => {
    setSearch(getCurrentSearch());
  }, [getCurrentSearch]);

  /**
   * get direction if order by key is present in search params
   */
  const getOrderByDirection = useCallback(
    (orderByKey: string) => {
      return (
        (search?.orderByExtracted?.key === orderByKey &&
          search?.orderByExtracted?.direction) ||
        undefined
      );
    },
    [search]
  );

  /**
   * Clear search params with new params
   */
  const setSearchParams = useCallback(
    (filters: SearchParamDef<T>) => {
      router.push({
        pathname: router.pathname,
        query: qs.stringify(filters, QUERY_OPTIONS),
      });
    },
    [router]
  );

  /**
   * Update existing search params with new params
   */
  const updateSearchParams = useCallback(
    (filters: SearchParamDef<T>) => {
      const currentSearch = qs.parse(
        qs.stringify(router.query, QUERY_OPTIONS),
        PARSE_OPTIONS
      );
      router.push({
        pathname: router.pathname,
        query: qs.stringify(
          {
            ...currentSearch,
            ...filters,
          },
          QUERY_OPTIONS
        ),
      });
    },
    [router]
  );

  return {
    search,
    setSearchParams,
    updateSearchParams,
    getOrderByDirection,
  };
};

export default useSearchParams;
