import { defaultPageSize } from './config.ts';

export const routes = {
  videos: {
    list: (page: number, pageSize = defaultPageSize) =>
      `/api/videos/?page=${page}&pageSize=${pageSize}`,
    one: (id: number) => `/api/videos/${id}`,
  },
};
