export type RequestCallbackType = <T>(
  url: string,
  options?: RequestInit
) => Promise<T>;

export const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;

export type MethodType = (typeof methods)[number];

export type ApiAdapterType = Record<MethodType, RequestCallbackType>;
