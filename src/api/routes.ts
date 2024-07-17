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

const prefix = import.meta.env.MODE === 'development' ? '/api' : '';

export const routes = {
  videos: {
    list: (page: number, pageSize = defaultPageSize) =>
      `${prefix}/videos/?page=${page}&pageSize=${pageSize}`,
    one: (id: IdType) => `${prefix}/videos/${id}`,
  },
  authors: {
    list: (page: number, pageSize = defaultPageSize) =>
      `${prefix}/authors/?page=${page}&pageSize=${pageSize}`,
    one: (id: IdType) => `${prefix}/authors/${id}`,
  },
};
