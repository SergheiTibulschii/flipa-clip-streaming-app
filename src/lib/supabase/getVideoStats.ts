import { supabase } from '../../main.tsx';

export const getVideoStats = (videoId: string) =>
  supabase.from('video_stats').select('*').eq('video_id', videoId).single();
