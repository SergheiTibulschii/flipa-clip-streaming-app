import { PropsWithChildren, useEffect, useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import { VideoDetailsContext } from './context.ts';
import { VideoDetailsLoaderType } from '../../lib/types/video-details-types.ts';
import { useSetAtom } from 'jotai';
import { addVideoToStatsAtom } from '../../lib/jotai/atoms/videos.atom.ts';

export const VideoDetailsProvider = ({ children }: PropsWithChildren) => {
  const videoDetails = useLoaderData() as VideoDetailsLoaderType;
  const addVideoToStats = useSetAtom(addVideoToStatsAtom);

  useEffect(() => {
    if (videoDetails.id) {
      addVideoToStats(videoDetails.stats);
    }
  }, [videoDetails.id]);

  const contextValue = useMemo(
    () => ({
      isLiked: videoDetails?.isLiked || false,
    }),
    [videoDetails?.isLiked]
  );

  return (
    <VideoDetailsContext.Provider value={contextValue}>
      {children}
    </VideoDetailsContext.Provider>
  );
};
