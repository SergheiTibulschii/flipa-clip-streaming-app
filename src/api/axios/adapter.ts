import { ApiAdapterType } from '../types.ts';
import { AxiosRequestConfig } from 'axios';
import { apiV1 } from '.';

const convertToAxiosConfig = (fetchConfig: RequestInit): AxiosRequestConfig => {
  return {
    headers: fetchConfig.headers as Record<string, string>,
    method: fetchConfig.method,
  };
};

export const axiosAdapter: ApiAdapterType = {
  get: <T>(url: string, options: RequestInit = {}): Promise<T> =>
    apiV1
      .get<T>(url, convertToAxiosConfig(options))
      .then((response) => response.data),
  post: <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const { body, ...restOptions } = options;
    return apiV1
      .post<T>(url, body, convertToAxiosConfig(restOptions))
      .then((response) => response.data);
  },
  delete: <T>(url: string, options: RequestInit = {}): Promise<T> =>
    apiV1
      .delete<T>(url, convertToAxiosConfig(options))
      .then((response) => response.data),
  put: <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const { body, ...restOptions } = options;
    return apiV1
      .put<T>(url, body, convertToAxiosConfig(restOptions))
      .then((response) => response.data);
  },
  patch: <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const { body, ...restOptions } = options;
    return apiV1
      .patch<T>(url, body, convertToAxiosConfig(restOptions))
      .then((response) => response.data);
  },
};
