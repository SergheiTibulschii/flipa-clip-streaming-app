import { getAllAuthorsStats } from '../../supabase/getAllAuthorsStats.ts';
import { atomWithDefault, loadable } from 'jotai/utils';
import { atom } from 'jotai';

export const authorsStateAsyncAtom = atom(async () => {
  const { data, error } = await getAllAuthorsStats();

  if (error) {
    throw error;
  }

  return data;
});

export const authorsWithDefaultAtom = atomWithDefault((get) => {
  return get(authorsStateAsyncAtom);
});

export const authorsWithDefaultLoadable = loadable(authorsWithDefaultAtom);
