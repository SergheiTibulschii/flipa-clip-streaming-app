import { RequestCallbackType } from '../types.ts';
import { api } from '../index.ts';
import useSWR, { BareFetcher, SWRConfiguration } from 'swr';

const fetcher = <T>(params: Parameters<RequestCallbackType>) =>
  api.get<T>(...params);

export const useApi = <T>(
  url: string,
  swrOptions?: SWRConfiguration,
  params?: RequestInit
) => useSWR<T>([url, params], fetcher as BareFetcher<T>, swrOptions);
