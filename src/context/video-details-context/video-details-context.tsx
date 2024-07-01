import { PropsWithChildren, useEffect, useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import { VideoStatsType } from '../../lib/types/supabase-custom-types.ts';
import { VideoDetailsContext } from './context.ts';
import { useSetAtom } from 'jotai';
import { setVideosAtom } from '../../lib/jotai/atoms/videos.ts';

export const VideoDetailsProvider = ({ children }: PropsWithChildren) => {
  const videoDetails = useLoaderData() as VideoStatsType | null;
  const setSupabaseVideos = useSetAtom(setVideosAtom);

  useEffect(() => {
    if (videoDetails) {
      setSupabaseVideos(videoDetails);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      viewsCount: videoDetails?.views_count || 0,
      likesCount: videoDetails?.likes_count || 0,
    }),
    [videoDetails?.likes_count, videoDetails?.views_count]
  );

  return (
    <VideoDetailsContext.Provider value={contextValue}>
      {children}
    </VideoDetailsContext.Provider>
  );
};
