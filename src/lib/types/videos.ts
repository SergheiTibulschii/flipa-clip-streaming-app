import { IdType } from './common.ts';
import { VideoStatsType } from './supabase-custom-types.ts';

export type VideoType = {
  id: IdType;
  media_url: string;
  title: string;
  description: string;
  created_at: string;
  share_url: string;
  artwork_url: string;
  author_id: string;
  tag: string;
  buttons: unknown[];
  stats?: VideoStatsType;
};
