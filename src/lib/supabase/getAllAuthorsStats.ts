import { supabase } from '../../main.tsx';

export const getAllAuthorsStats = () =>
  supabase.from('author_stats').select('*');

export const getStatsForSelectedAuthors = (authorIds: string[]) => {
  return supabase.from('author_stats').select('*').in('author_id', authorIds);
};
