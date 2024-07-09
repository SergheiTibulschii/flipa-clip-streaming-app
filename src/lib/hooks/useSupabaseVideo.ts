import { useAtomValue } from 'jotai';
import { videosWithDefaultLoadable } from '../jotai/atoms/videos';

export const useSupabaseVideo = (videoId: string) => {
  const videos = useAtomValue(videosWithDefaultLoadable);

  return (
    (videos.state !== 'loading' &&
      videos.state !== 'hasError' &&
      videos.data.find((video) => video.stats.video_id == videoId)) ||
    null
  );
};
