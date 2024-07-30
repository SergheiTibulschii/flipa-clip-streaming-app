import { useAtomValue } from 'jotai/index';
import { videoStatsAtom } from '../atoms/videos.atom.ts';

export const useVideoStats = (videoId: string, authorId = '') => {
  const stats = useAtomValue(videoStatsAtom);

  return (
    stats.find((s) => s.video_id === videoId) || {
      video_id: videoId,
      views_count: 0,
      likes_count: 0,
      author_id: authorId,
    }
  );
};
