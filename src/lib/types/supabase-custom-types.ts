import { Database } from '../../supabase';

export type VideoStatsType = Database['public']['Tables']['video_stats']['Row'];

export type AuthorsStatsType =
  Database['public']['Tables']['author_stats']['Row'];
