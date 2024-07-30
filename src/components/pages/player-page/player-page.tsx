import { useLoaderData } from 'react-router-dom';
import { IconButton } from '../../ui/button/icon-button.tsx';
import { CloseIcon, ShareIcon } from '../../icons.ts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../../context/app-store-context';
import { useSetAtom } from 'jotai/index';
import { useGoBack } from '../../../lib/hooks/useGoBack.ts';
import { viewVideo } from '../../../lib/supabase/viewVideo.ts';
import { VideoDetailsType } from '../../../lib/types/flipa-clip-api-types.ts';
import { incrementViewsAtom } from '../../../lib/jotai/atoms/incrementViews.atom.ts';
import Hls from 'hls.js';
import { ShareBtn } from '../../elements/share-btn.tsx';

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
  const video = useLoaderData() as VideoDetailsType;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { userId } = useAppStore();
  const incrementViews = useSetAtom(incrementViewsAtom);
  const [error, setError] = useState('');
  const goBack = useGoBack();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const trackView = useCallback(async () => {
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
  }, [incrementViews, userId, video?.author_id, video?.id]);

  useEffect(() => {
    if (videoRef.current) {
      const hls = new Hls();
      hls.loadSource(prepareLink(video?.video_source));
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (videoRef.current) {
          videoRef.current.play();

          trackView();
        }
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setError('Unable to load video :(');
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              setError('Video format is not supported :(');
              break;
            default:
              setError('An error occurred while loading the video :(');
              break;
          }
          hls.destroy();
        }
      });

      return () => {
        hls.destroy();
      };
    }
  }, [trackView, video?.video_source]);

  const handleClose = useCallback(() => {
    goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex flex-col">
      <div className="bg-dark text-white flex gap-8 items-center justify-between px-5 py-3">
        <div className="font-bold leading-1.5 truncate" title={video.title}>
          {video.title}
        </div>
        <div className="flex gap-2">
          <ShareBtn shareUrl={video.share_url} videoId={video?.id} />
          <IconButton onClick={handleClose} variant="secondary">
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="relative flex-1 bg-dark">
        {!error ? (
          <div className="absolute inset-0">
            <video
              className="aspect-video h-full"
              ref={videoRef}
              controls
            ></video>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-bold leading-1.5">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
