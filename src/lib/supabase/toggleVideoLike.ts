import { supabase } from '../../main.tsx';

export const unlikeVideo = async (videoId: string, userId: string) =>
  supabase.from('likes').delete().eq('video_id', videoId).eq('user_id', userId);

export const likeVideo = async (
  videoId: string,
  userId: string,
  authorId: string
) =>
  supabase
    .from('likes')
    .insert({ video_id: videoId, user_id: userId, author_id: authorId });
