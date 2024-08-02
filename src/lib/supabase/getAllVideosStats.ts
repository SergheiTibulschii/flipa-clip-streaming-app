import { supabase } from '../../main.tsx';

export const getAllVideosStats = () => supabase.from('video_stats').select('*');

export const getStatsForSelectedVideos = (videoIds: string[]) => {
  return supabase.from('video_stats').select('*').in('video_id', videoIds);
};
