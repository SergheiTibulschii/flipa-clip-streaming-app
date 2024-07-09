import { useLoaderData } from 'react-router-dom';
import { IconButton } from '../../ui/button/icon-button.tsx';
import { CloseIcon, ShareIcon } from '../../icons.ts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../../context/app-store-context';
import { useSetAtom } from 'jotai/index';
import { videosIncrementViewsAtom } from '../../../lib/jotai/atoms/videos';
import { VideoType } from '../../../lib/types/videos.ts';
import { useGoBack } from '../../../lib/hooks/useGoBack.ts';
import { viewVideo } from '../../../lib/supabase/viewVideo.ts';
import Player from '@vimeo/player';
import { Loader } from '../../ui/loader.tsx';

const prepareLink = (url?: string) => {
  if (!url) return 'https://player.vimeo.com/video/x';

  const videoLink = new URL(url);
  videoLink.searchParams.set('playsinline', '1');
  videoLink.searchParams.set('transparent', '0');
  videoLink.searchParams.set('byline', '0');
  videoLink.searchParams.set('portrait', '0');
  videoLink.searchParams.set('title', '0');
  return videoLink.toString();
};

export const PlayerPage = () => {
  const video = useLoaderData() as VideoType;
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLIFrameElement | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>();
  const { userId } = useAppStore();
  const incrementViews = useSetAtom(videosIncrementViewsAtom);
  const goBack = useGoBack();

  useEffect(() => {
    if (!video) return;

    const trackView = async () => {
      const { error } = await viewVideo(
        String(video?.id),
        userId,
        String(video?.author_id)
      );

      if (!error) {
        incrementViews({
          videoId: String(video?.id),
          authorId: String(video?.author_id),
        });
      }
    };

    trackView();
  }, [video?.id, video?.author_id]);

  useEffect(() => {
    if (ref.current) {
      const newPlayer = new Player(ref.current);

      newPlayer.on('loaded', () => {
        setIsLoading(false);
      });

      newPlayer.on('enterpictureinpicture', () => {
        if (containerRef.current) {
          containerRef.current.style.visibility = 'hidden';
          containerRef.current.style.pointerEvents = 'none';
        }
      });

      newPlayer.on('leavepictureinpicture', () => {
        if (containerRef.current) {
          containerRef.current.style.visibility = 'visible';
          containerRef.current.style.pointerEvents = 'all';
        }
      });
      newPlayer.getVideoTitle().then((title) => {
        setVideoTitle(title);
      });

      return () => {
        newPlayer.destroy();
      };
    }
  }, []);

  const handleClose = useCallback(() => {
    goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex flex-col">
      <div className="bg-dark text-white flex gap-8 items-center justify-between px-5 py-3">
        <div className="font-bold leading-1.5 truncate" title={videoTitle}>
          {videoTitle}
        </div>
        <div className="flex gap-2">
          <IconButton variant="secondary">
            <ShareIcon />
          </IconButton>
          <IconButton onClick={handleClose} variant="secondary">
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="relative flex-1 bg-dark">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        )}
        <iframe
          ref={ref}
          className="image"
          src={prepareLink(video?.media_url)}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
