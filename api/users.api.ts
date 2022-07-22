import _ from "lodash";

import { formatApiErrorResponse } from "../helpers/util.helper";
import { ApiResponse } from "../types/api.types";
import { User, GetUsersParam } from "../types/users.type";

import { api } from "./api";

export class UsersAPICore {
  getUsersApi(
    url: string,
    params?: GetUsersParam
  ): Promise<ApiResponse<User[]>> {
    return api
      .get(url, { params })
      .then((response) => _.get(response, "data", []))
      .catch((error) => formatApiErrorResponse(error));
  }

  getUserApi(url: string): Promise<ApiResponse<User>> {
    return api
      .get(url)
      .then(response => _.get(response, "data.data", {}))
      .catch(error => formatApiErrorResponse(error));
  }

  createUserApi(url: string, data: User): Promise<ApiResponse<User[]>> {
    return api
      .post(url, data)
      .then((response) => _.get(response, "data", {}))
      .catch((error) => formatApiErrorResponse(error));
  }

  updateUserApi(url: string, data: User): Promise<ApiResponse<User[]>> {
    console.log('url', url);
    
    return api
      .put(`${url}/${data.id}`, data)
      .then((response) => _.get(response, "data", {}))
      .catch((error) => formatApiErrorResponse(error));
  }

  deleteUserApi(url: string): Promise<ApiResponse<User[]>> {
    return api
      .delete(url)
      .then((response) => _.get(response, "data", {}))
      .catch((error) => formatApiErrorResponse(error));
  }
}

const UsersCore = new UsersAPICore();

export default UsersCore;
