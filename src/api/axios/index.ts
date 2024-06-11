import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { env } from '../../env.ts';

const axiosClient = axios.create({
  baseURL: env.VITE_API_BASE_V1,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': env.VITE_API_KEY,
  },
});

const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.get<T>(url, config),
    post: <T>(url: string, data: unknown, config: AxiosRequestConfig = {}) =>
      axios.post<T>(url, data, config),
    put: <T>(url: string, data: unknown, config: AxiosRequestConfig = {}) =>
      axios.put<T>(url, data, config),
    delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.delete<T>(url, config),
    patch: <T>(url: string, data: unknown, config: AxiosRequestConfig = {}) =>
      axios.patch<T>(url, data, config),
  };
};

export const apiV1 = api(axiosClient);
