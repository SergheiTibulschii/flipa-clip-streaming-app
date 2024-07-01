import { supabase } from '../../main.tsx';

export const getAllAuthorsStats = () => supabase.from('author_stats').select('*');
