import { supabase } from '../../main.tsx';

export const getVideoStats = (videoId: string, userId: string) =>
  supabase
    .rpc('get_video_stats_with_user_like', {
      videoid: videoId,
      userid: userId,
    })
    .single();
