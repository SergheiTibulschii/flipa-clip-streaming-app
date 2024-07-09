import { getAllAuthorsStats } from '../../supabase/getAllAuthorsStats.ts';
import { atomWithDefault, loadable } from 'jotai/utils';
import { atom } from 'jotai';
import { apiV1 } from '../../../api/axios';
import { routes } from '../../../api';
import { AuthorType } from '../../types/authors.ts';

export const authorsStateAsyncAtom = atom(async () => {
  const [authorStats, authors] = await Promise.all([
    getAllAuthorsStats(),
    apiV1.get<AuthorType[]>(routes.authors.list(1, 200)),
  ]);

  if (authorStats.error || authors.status !== 200) {
    throw new Error('Failed to fetch videos');
  }

  return authors.data?.map((author) => {
    const stats = authorStats.data.find((v) => v.author_id === author.id);

    return {
      ...author,
      stats: stats || {
        author_id: author.id,
        views_count: 0,
        likes_count: 0,
      },
    };
  });
});

export const authorsWithDefaultAtom = atomWithDefault((get) => {
  return get(authorsStateAsyncAtom);
});

export const authorsWithDefaultLoadable = loadable(authorsWithDefaultAtom);
