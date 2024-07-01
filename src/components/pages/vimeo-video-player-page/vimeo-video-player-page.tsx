import { useCallback, useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';
import { IconButton } from '../../ui/button/icon-button.tsx';
import { CloseIcon, ShareIcon } from '../../icons.ts';
import { Loader } from '../../ui/loader.tsx';
import { useGoBack } from '../../../lib/hooks/useGoBack.ts';
import { useSearchParams } from 'react-router-dom';

const prepareLink = (url: string) => {
  const videoLink = new URL(url);
  videoLink.searchParams.set('playsinline', '1');
  videoLink.searchParams.set('transparent', '0');
  videoLink.searchParams.set('byline', '0');
  videoLink.searchParams.set('portrait', '0');
  videoLink.searchParams.set('title', '0');
  return videoLink.toString();
};

export const VimeoVideoPlayerPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLIFrameElement | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const goBack = useGoBack();
  const [params] = useSearchParams();
  const videoLink = prepareLink(
    decodeURIComponent(params.get('videoUrl') || '')
  );

  const handleClose = useCallback(goBack, [goBack]);

  useEffect(() => {
    if (ref.current) {
      const newPlayer = new Player(ref.current);
      newPlayer.ready().catch(() => {
        setIsError(true);
      });
      newPlayer.on('loaded', () => {
        setIsVideoLoaded(true);
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
  }, [handleClose]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-black "
    >
      <div className="text-white flex gap-8 items-center justify-between px-5 py-3">
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
      <div className="flex-1 realtive">
        {!isVideoLoaded && !isError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        )}
        <iframe
          ref={ref}
          className="h-full w-full"
          src={videoLink}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
