import { PropsWithChildren, useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import { VideoDetailsContext } from './context.ts';
import { VideoDetailsLoaderType } from '../../lib/types/video-details-types.ts';

export const VideoDetailsProvider = ({ children }: PropsWithChildren) => {
  const videoDetails = useLoaderData() as VideoDetailsLoaderType;

  const contextValue = useMemo(
    () => ({
      viewsCount: videoDetails?.stats?.views_count || 0,
      likesCount: videoDetails?.stats?.likes_count || 0,
      isLiked: videoDetails?.isLiked || false,
    }),
    [
      videoDetails?.stats?.likes_count,
      videoDetails?.stats?.views_count,
      videoDetails?.isLiked,
    ]
  );

  return (
    <VideoDetailsContext.Provider value={contextValue}>
      {children}
    </VideoDetailsContext.Provider>
  );
};
