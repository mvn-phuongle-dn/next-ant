import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import moment from "moment";

import { ENV } from "../constants/env";
import { getTokens } from "../helpers/auth.helpers";

/**
 * All the endpoint that do not require an access token
 */
// const anonymousEndpoints = [AuthEndpointsEnum.LOGIN.toString()];

/**
 * "Wrapper" around getTokens
 * can be changed to have refresh functionality if api supports it
 */
export const getRefreshedToken = () => {
  const { accessToken, expiresAt } = getTokens();

  const isTokenExpired = moment().isSameOrAfter(expiresAt);

  return { accessToken, isTokenExpired };
};

/**
 * Adds authorization headers to API calls
 * @param {AxiosRequestConfig} request
 */
const authInterceptor = async (request: AxiosRequestConfig) => {
  const { accessToken } = getRefreshedToken();

  if (accessToken && request?.headers) {
    request.headers.Authorization = `${accessToken}`;
    return request;
  }

  if (!accessToken) {
    // TODO: handle when UNAUTHORIZED;
    // return Promise.reject(ApiStatusCodes.UNAUTHORIZED);
    return request;
  }

  return request;
};

/**
 * Axios response interceptors
 * @param {AxiosResponse} response
 */
const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

/**
 * Axios error interceptors
 * @param {AxiosResponse} response
 */
const errorInterceptor = (axiosError: AxiosError) => {
  return Promise.reject(axiosError);
};

/** Setup an API instance */
export const api = axios.create({
  baseURL: ENV.API_HOST,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(authInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);
