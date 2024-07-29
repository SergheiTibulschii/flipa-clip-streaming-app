import { atom } from 'jotai';
import { videoStatsAtom } from './videos.atom.ts';
import { authorStatsAtom } from './authors.ts';

export const incrementLikesAtom = atom(
  null,
  async (
    get,
    set,
    update: { videoId: string; authorId: string; type: 'incr' | 'decr' }
  ) => {
    const videoStats = get(videoStatsAtom);
    const authorStats = get(authorStatsAtom);

    set(
      videoStatsAtom,
      videoStats.map((vs) => {
        if (vs.video_id === update.videoId) {
          return {
            ...vs,
            likes_count:
              update.type === 'incr' ? vs.likes_count + 1 : vs.likes_count - 1,
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
            likes_count:
              update.type === 'incr' ? as.likes_count + 1 : as.likes_count - 1,
          };
        }
        return as;
      })
    );
  }
);
