import { contextFactory } from '../context-factory.ts';

type VideoDetailsContextType = {
  isLiked: boolean;
};

export const [useVideoDetails, VideoDetailsContext] =
  contextFactory<VideoDetailsContextType>();
