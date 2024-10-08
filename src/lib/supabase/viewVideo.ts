import { supabase } from '../../main.tsx';

export const viewVideo = async (
  videoId: string,
  userId: string,
  authorId: string
) =>
  supabase.from('views').insert({
    video_id: videoId,
    user_id: userId,
    author_id: authorId,
  });
