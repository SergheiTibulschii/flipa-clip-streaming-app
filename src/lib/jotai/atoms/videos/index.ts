import { atomWithDefault, loadable } from 'jotai/utils';
import { atom } from 'jotai';
import { getAllVideosStats } from '../../../supabase/getAllVideosStats.ts';
import { authorsWithDefaultAtom } from '../authors.ts';
import { VideoStatsType } from '../../../types/supabase-custom-types.ts';
import { apiV1 } from '../../../../api/axios';
import { routes } from '../../../../api';
import { VideoType } from '../../../types/videos.ts';

export const videosAsyncAtom = atom(async () => {
  const [videoStats, videos] = await Promise.all([
    getAllVideosStats(),
    apiV1.get<VideoType[]>(routes.videos.list(1, 200)),
  ]);

  if (videoStats.error || videos.status !== 200) {
    throw new Error('Failed to fetch videos');
  }

  return videos.data?.map((video) => {
    const stats = videoStats.data.find((v) => v.video_id == video.id);

    return {
      ...video,
      stats: stats || {
        video_id: video.id,
        views_count: 0,
        likes_count: 0,
        author_id: video.author_id,
      },
    };
  });
});

export const videosWithDefaultAtom = atomWithDefault((get) => {
  return get(videosAsyncAtom);
});

export const videosWithDefaultLoadable = loadable(videosWithDefaultAtom);

export const setVideosAtom = atom(
  null,
  async (get, set, update: VideoStatsType) => {
    const videos = await get(videosWithDefaultAtom);

    set(
      videosWithDefaultAtom,
      Promise.resolve(
        videos.map((v) => {
          if (v.id === update.video_id) {
            v.stats = update;
            return v;
          }
          return v;
        })
      )
    );
  }
);

export const videosIncrementViewsAtom = atom(
  null,
  async (get, set, update: { videoId: string; authorId: string }) => {
    const videos = await get(videosWithDefaultAtom);
    const authors = await get(authorsWithDefaultAtom);

    set(
      videosWithDefaultAtom,
      Promise.resolve(
        videos.map((v) => {
          // TODO
          if (v.stats.video_id == update.videoId) {
            return {
              ...v,
              stats: {
                ...v.stats,
                views_count: v.stats.views_count + 1,
              },
            };
          }

          return v;
        })
      )
    );

    set(
      authorsWithDefaultAtom,
      Promise.resolve(
        authors.map((a) => ({
          ...a,
          stats: {
            ...a.stats,
            views_count: a.stats.views_count + 1,
          },
        }))
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

    set(
      videosWithDefaultAtom,
      Promise.resolve(
        videos.map((v) => {
          if (v.stats.video_id == update.videoId) {
            return {
              ...v,
              stats: {
                ...v.stats,
                likes_count:
                  update.type === 'incr'
                    ? v.stats.likes_count + 1
                    : v.stats.likes_count - 1,
              },
            };
          }

          return v;
        })
      )
    );
  }
);
