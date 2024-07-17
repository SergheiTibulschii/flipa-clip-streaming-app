import { defaultPageSize } from './config.ts';
import { IdType } from '../lib/types';

export const routePatterns = {
  home: '/',
  videos: {
    details: '/video/:videoId',
    play: 'video/:videoId/play',
  },
  creator: {
    details: '/creator/:creatorId',
  },
  becomeCreator: '/become-creator',
};

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
