import { supabase } from '../../main.tsx';

export const getAllVideosStats = () => supabase.from('video_stats').select('*');
