import { useAtomValue } from 'jotai/index';
import { authorStatsAtom } from '../atoms/authors.ts';

export const useCreatorStats = (id: string) => {
  const authorsStats = useAtomValue(authorStatsAtom);
  return (
    authorsStats.find((s) => s.author_id === id) || {
      author_id: id,
      views_count: 0,
      likes_count: 0,
    }
  );
};
