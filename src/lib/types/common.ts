export type ViteImportVariables = 'BASE_URL' | 'MODE' | 'DEV' | 'PROD' | 'SSR';

export type RemoveIndex<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : K]: T[K];
};

export type RouterHandleType = {
  from?: string;
  trackType?: string;
} | null;

export type Entity = {
  id: string;
};
