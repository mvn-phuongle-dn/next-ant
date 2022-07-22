import useSearchParams from "./useSearchParams";
import useSWR from "swr";
import { convertApiParams } from "../helpers/api.helpers";
import ProductsCore from "../api/products.api";

const useProducts = () => {
  const {search}= useSearchParams()
  const {data, error} = useSWR(
    ["products",
      convertApiParams({ page: search.page, pageSize: search?.pageSize })
    ],
    ProductsCore.getProductsApi
  )
  return {
    products: data?.data,
    isLoading: !error && !data,
    isError: error,
    pagination: {
      page: search.page,
      pageSize: search?.pageSize,
      total: data?.total,
    },
  }
}
