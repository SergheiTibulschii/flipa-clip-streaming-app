import { defaultPageSize } from './config.ts';

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
  notSupported: '/not-supported',
};

const prefix = import.meta.env.MODE === 'development' ? '/api' : '';

export const routes = {
  home: `${prefix}/videos/home`,
  videos: {
    list: (page: number, pageSize = defaultPageSize) =>
      `${prefix}/videos/?page=${page}&pageSize=${pageSize}`,
    one: (id: string) => `${prefix}/videos/${id}`,
  },
  authors: {
    list: (page: number, pageSize = defaultPageSize) =>
      `${prefix}/authors/?page=${page}&pageSize=${pageSize}`,
    one: (id: string) => `${prefix}/authors/${id}`,
  },
};
