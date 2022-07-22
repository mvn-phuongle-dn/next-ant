import { AxiosResponse } from "axios";
import _ from "lodash";

import { api } from "./api";
import { AuthEndpointsEnum } from "../constants/auth/auth.endpoints";
import { formatApiErrorResponse } from "../helpers/util.helper";
import { ApiResponse } from "../types/api.types";
import {
  UserDef,
  LoginRequestDef,
  ChangePasswordDef,
} from "../types/auth.types";

export class AuthAPICore {
  login(params: LoginRequestDef): Promise<AxiosResponse> {
    return api
      .post(AuthEndpointsEnum.login, params)
      .catch(error => formatApiErrorResponse(error));
  }

  getAuth(): Promise<AxiosResponse> {
    return api.get(AuthEndpointsEnum.info);
  }

  changePasswordApi(
    url: string,
    data: ChangePasswordDef
  ): Promise<ApiResponse<UserDef>> {
    return api
      .put(url, data)
      .then(response => _.get(response, "data", {}))
      .catch(error => formatApiErrorResponse(error));
  }

  updateAccountInfoApi(
    url: string,
    data: UserDef
  ): Promise<ApiResponse<UserDef>> {
    return api
      .put(url, data)
      .then(response => _.get(response, "data", {}))
      .catch(error => formatApiErrorResponse(error));
  }
}

const authCore = new AuthAPICore();

export default authCore;
