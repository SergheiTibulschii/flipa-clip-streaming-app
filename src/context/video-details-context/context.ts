import { contextFactory } from '../context-factory.ts';

type VideoDetailsContextType = {
  viewsCount: number;
  likesCount: number;
};

export const [useVideoDetails, VideoDetailsContext] =
  contextFactory<VideoDetailsContextType>();
