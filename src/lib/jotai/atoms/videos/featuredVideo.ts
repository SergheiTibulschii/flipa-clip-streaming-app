import { loadable } from 'jotai/utils';
import { videosWithDefaultAtom } from './index.ts';
import { atom } from 'jotai';

export const featuredVideoAtom = atom(async (get) => {
  const videos = await get(videosWithDefaultAtom);

  return videos?.find((v) => v.tag === 'featured');
});

export const featuredVideoLoadableAtom = loadable(featuredVideoAtom);
