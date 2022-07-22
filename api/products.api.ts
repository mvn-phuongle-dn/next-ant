import _ from "lodash";

import { formatApiErrorResponse } from "../helpers/util.helper";
import { ApiResponse } from "../types/api.types";
import { Product, GetProductsParam } from "../types/products.type";

import { api } from "./api";

export class ProductsAPICore {
  getProductsApi(
    url: string,
    params?: GetProductsParam
  ): Promise<ApiResponse<Product[]>> {
    return api
      .get(url, { params })
      .then(response => _.get(response, "data", {}))
      .catch(error => formatApiErrorResponse(error));
  }

  getUserByIdApi(url: string, id: string): Promise<ApiResponse<Product[]>> {
    return api
      .get(`${url}/${id}`)
      .then(response => _.get(response, "data", []))
      .catch(error => formatApiErrorResponse(error));
  }

  createProductApi(
    url: string,
    data: Product
  ): Promise<ApiResponse<Product[]>> {
    return api
      .post(url, data)
      .then(response => _.get(response, "data", {}))
      .catch(error => formatApiErrorResponse(error));
  }

  updateProductApi(
    url: string,
    data: Product
  ): Promise<ApiResponse<Product[]>> {
    return api
      .put(`${url}/${data.id}`, data)
      .then(response => _.get(response, "data", {}))
      .catch(error => formatApiErrorResponse(error));
  }

  deleteProductApi(url: string): Promise<ApiResponse<Product[]>> {
    return api
      .delete(url)
      .then(response => _.get(response, "data", {}))
      .catch(error => formatApiErrorResponse(error));
  }
}

const ProductsCore = new ProductsAPICore();

export default ProductsCore;
