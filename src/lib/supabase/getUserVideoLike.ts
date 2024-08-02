import { supabase } from '../../main.tsx';

export const getUserVideoLike = (videoId: string, userId: string) =>
  supabase
    .from('likes')
    .select('*')
    .eq('video_id', videoId)
    .eq('user_id', userId)
    .single();
