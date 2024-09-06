import { RequestCallbackType } from '../types.ts';
import { api } from '../index.ts';
import useSWR, { BareFetcher, SWRConfiguration } from 'swr';

const fetcher = <T>(params: Parameters<RequestCallbackType>) =>
  api.get<T>(...params).catch((error) => {
    console.log(`Fetch error: ${error}`);
    return null;
  });

export const useApi = <T>(
  url: string,
  swrOptions?: SWRConfiguration,
  params?: RequestInit
) =>
  useSWR<T>(url ? [url, params] : null, fetcher as BareFetcher<T>, swrOptions);
