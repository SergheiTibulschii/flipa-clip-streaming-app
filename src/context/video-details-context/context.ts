import { contextFactory } from '../context-factory.ts';

type VideoDetailsContextType = {
  viewsCount: number;
  likesCount: number;
  isLiked: boolean;
};

export const [useVideoDetails, VideoDetailsContext] =
  contextFactory<VideoDetailsContextType>();
