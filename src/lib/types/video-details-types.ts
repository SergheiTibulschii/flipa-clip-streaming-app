import { VideoDetailsType } from './flipa-clip-api-types.ts';
import { VideoStatsType } from './supabase-custom-types.ts';

export type VideoDetailsLoaderType = VideoDetailsType & { isLiked: boolean } & {
  stats: VideoStatsType;
};
