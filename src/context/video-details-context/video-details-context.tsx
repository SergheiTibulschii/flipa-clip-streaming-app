import { PropsWithChildren, useEffect, useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import { VideoDetailsContext } from './context.ts';
import { useSetAtom } from 'jotai';
import { setVideosAtom } from '../../lib/jotai/atoms/videos.ts';
import { VideoDetailsLoaderType } from '../../lib/types/video-details-types.ts';

export const VideoDetailsProvider = ({ children }: PropsWithChildren) => {
  const videoDetails = useLoaderData() as VideoDetailsLoaderType;
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
      isLiked: videoDetails?.isLiked || false,
    }),
    [
      videoDetails?.likes_count,
      videoDetails?.views_count,
      videoDetails?.isLiked,
    ]
  );

  return (
    <VideoDetailsContext.Provider value={contextValue}>
      {children}
    </VideoDetailsContext.Provider>
  );
};
