import { defaultPageSize } from './config.ts';
import { IdType } from '../lib/types';

export const routes = {
  videos: {
    list: (page: number, pageSize = defaultPageSize) =>
      `/api/videos/?page=${page}&pageSize=${pageSize}`,
    one: (id: IdType) => `/api/videos/${id}`,
  },
  authors: {
    list: (page: number, pageSize = defaultPageSize) =>
      `/api/authors/?page=${page}&pageSize=${pageSize}`,
    one: (id: IdType) => `/api/authors/${id}`,
  },
};
