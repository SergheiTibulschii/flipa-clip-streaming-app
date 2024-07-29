import { atom } from 'jotai';
import { videoStatsAtom } from './videos.atom.ts';
import { authorStatsAtom } from './authors.ts';

export const incrementViewsAtom = atom(
  null,
  async (get, set, update: { videoId: string; authorId: string }) => {
    const videoStats = get(videoStatsAtom);
    const authorStats = get(authorStatsAtom);

    set(
      videoStatsAtom,
      videoStats.map((vs) => {
        if (vs.video_id === update.videoId) {
          return {
            ...vs,
            views_count: vs.views_count + 1,
          };
        }
        return vs;
      })
    );
    set(
      authorStatsAtom,
      authorStats.map((as) => {
        if (as.author_id === update.authorId) {
          return {
            ...as,
            views_count: as.views_count + 1,
          };
        }
        return as;
      })
    );
  }
);
