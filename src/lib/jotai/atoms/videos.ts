import { atomWithDefault, loadable } from 'jotai/utils';
import { atom } from 'jotai';
import { getAllVideosStats } from '../../supabase/getAllVideosStats.ts';
import { authorsWithDefaultAtom } from './authors.ts';
import { VideoStatsType } from '../../types/supabase-custom-types.ts';

export const authorsStateAsyncAtom = atom(async () => {
  const { data, error } = await getAllVideosStats();

  if (error) {
    throw error;
  }

  return data;
});

export const videosWithDefaultAtom = atomWithDefault((get) => {
  return get(authorsStateAsyncAtom);
});

export const videosWithDefaultLoadable = loadable(videosWithDefaultAtom);

export const setVideosAtom = atom(
  null,
  async (get, set, update: VideoStatsType) => {
    const videos = await get(videosWithDefaultAtom);
    const video = videos.find((v) => v.video_id === update.video_id);

    if (!video) {
      set(videosWithDefaultAtom, Promise.resolve([...videos, update]));
    }
  }
);

export const videosIncrementViewsAtom = atom(
  null,
  async (get, set, update: { videoId: string; authorId: string }) => {
    const videos = await get(videosWithDefaultAtom);
    const video = videos.find((v) => v.video_id === update.videoId);
    const authors = await get(authorsWithDefaultAtom);
    const author = authors.find((a) => a.author_id === update.authorId);

    set(
      videosWithDefaultAtom,
      Promise.resolve(
        video
          ? videos.map((v) => {
              if (v.video_id === update.videoId) {
                return {
                  ...v,
                  views_count: v.views_count + 1,
                };
              }

              return v;
            })
          : [
              ...videos,
              {
                video_id: update.videoId,
                views_count: 1,
                likes_count: 0,
                author_id: update.authorId,
              },
            ]
      )
    );

    set(
      authorsWithDefaultAtom,
      Promise.resolve(
        author
          ? authors.map((a) => {
              if (a.author_id === update.authorId) {
                return {
                  ...a,
                  views_count: a.views_count + 1,
                };
              }

              return a;
            })
          : [
              ...authors,
              { author_id: update.authorId, views_count: 1, likes_count: 0 },
            ]
      )
    );
  }
);

export const videosToggleLikesAtom = atom(
  null,
  async (
    get,
    set,
    update: { videoId: string; authorId: string; type: 'incr' | 'decr' }
  ) => {
    const videos = await get(videosWithDefaultAtom);
    const video = videos.find((v) => v.video_id === update.videoId);

    set(
      videosWithDefaultAtom,
      Promise.resolve(
        video
          ? videos.map((v) => {
              if (v.video_id === update.videoId) {
                return {
                  ...v,
                  likes_count:
                    update.type === 'incr'
                      ? v.likes_count + 1
                      : v.likes_count - 1,
                };
              }

              return v;
            })
          : [
              ...videos,
              {
                video_id: update.videoId,
                views_count: 0,
                author_id: update.authorId,
                likes_count: 1,
              },
            ]
      )
    );
  }
);
