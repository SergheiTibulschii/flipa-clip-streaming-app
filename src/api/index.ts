import { methods, MethodType, RequestCallbackType } from './types.ts';
import { axiosAdapter } from './axios/adapter.ts';
import { routes } from './routes.ts';

const apiRequest: RequestCallbackType = (url, options) => {
  const method = (options?.method || 'get').toLowerCase() as MethodType;

  if (!methods.includes(method)) {
    throw new Error(`Method ${method} is not supported`);
  }

  return axiosAdapter[method](url, options);
};

const api = {
  get: apiRequest,
  post: <TResponse, TBody>(
    url: string,
    body: TBody,
    options: RequestInit = {}
  ) => {
    const postParams = {
      ...options,
      method: 'post',
      body: JSON.stringify(body),
    };

    return apiRequest<TResponse>(url, postParams);
  },
};

export { api, routes };
