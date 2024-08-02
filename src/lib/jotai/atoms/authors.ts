import { getStatsForSelectedAuthors } from '../../supabase/getAllAuthorsStats.ts';
import { atom } from 'jotai';
import { AuthorsStatsType } from '../../types/supabase-custom-types.ts';

export const authorStatsAtom = atom<AuthorsStatsType[]>([]);

export const setAuthorsStateAtom = atom(
  null,
  async (get, set, creatorIds: string[]) => {
    const authorStats = get(authorStatsAtom);
    const stats = await getStatsForSelectedAuthors(creatorIds);

    if (stats.data && !stats.error) {
      const uniqueIds = new Set([
        ...authorStats.map((as) => as.author_id),
        ...creatorIds,
      ]);

      set(
        authorStatsAtom,
        Array.from(uniqueIds).map((id) => {
          return (
            stats.data.find((s) => s.author_id === id) ||
            authorStats.find((as) => as.author_id === id) || {
              author_id: id,
              views_count: 0,
              likes_count: 0,
            }
          );
        })
      );
    }
  }
);
