import { atom } from 'jotai';
import { getStatsForSelectedVideos } from '../../supabase/getAllVideosStats.ts';
import { VideoStatsType } from '../../types/supabase-custom-types.ts';

export const videoStatsAtom = atom<VideoStatsType[]>([]);

export const setVideosStateAtom = atom(
  null,
  async (get, set, videoIds: string[]) => {
    const videoStats = get(videoStatsAtom);
    const stats = await getStatsForSelectedVideos(videoIds);

    if (stats.data && !stats.error) {
      const uniqueIds = new Set([
        ...videoStats.map((vs) => vs.video_id),
        ...videoIds,
      ]);
      set(
        videoStatsAtom,
        Array.from(uniqueIds).map((id) => {
          return (
            stats.data.find((s) => s.video_id === id) ||
            videoStats.find((vs) => vs.video_id === id) || {
              video_id: id,
              views_count: 0,
              likes_count: 0,
              author_id: '',
            }
          );
        })
      );
    }
  }
);

export const addVideoToStatsAtom = atom(
  null,
  async (get, set, stat: VideoStatsType) => {
    const videoStats = get(videoStatsAtom);

    const existingVideo = videoStats.find(
      (vs) => vs.video_id === stat.video_id
    );

    set(
      videoStatsAtom,
      existingVideo
        ? videoStats.map((vs) => {
            if (vs.video_id === stat.video_id) {
              return stat;
            }
            return vs;
          })
        : [...videoStats, stat]
    );
  }
);
