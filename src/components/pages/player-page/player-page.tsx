import { useLoaderData } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../../context/app-store-context';
import { useSetAtom } from 'jotai/index';
import { viewVideo } from '../../../lib/supabase/viewVideo.ts';
import { VideoDetailsType } from '../../../lib/types/flipa-clip-api-types.ts';
import { incrementViewsAtom } from '../../../lib/jotai/atoms/incrementViews.atom.ts';
import { IconButton } from '../../ui/button/icon-button.tsx';
import { CloseIcon } from '../../icons.ts';
import { useGoBack } from '../../../lib/hooks/useGoBack.ts';
import { ShareBtn } from '../../elements/share-btn.tsx';
import Hls from 'hls.js';

type VideoControlBarProps = {
  title: string;
  share_url: string;
  videoId: string;
  handleClose: () => void;
  isPlaying: boolean;
};

const VideoControlBar = ({
  title,
  share_url,
  videoId,
  handleClose,
  isPlaying,
}: VideoControlBarProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translateY(${isPlaying ? '-100%' : '0'})`;
      ref.current.style.opacity = isPlaying ? '0' : '1';
    }
  }, [isPlaying]);

  return (
    <div
      ref={ref}
      style={{
        top: 'env(safe-area-inset-top, 0)',
      }}
      className="absolute left-0 w-full bg-dark text-white flex gap-8 items-center justify-between px-5 py-3 transition-all duration-500"
    >
      <div className="font-bold leading-1.5 truncate" title={title}>
        {title}
      </div>
      <div className="flex gap-2">
        <ShareBtn shareUrl={share_url} videoId={videoId} />
        <IconButton onClick={handleClose} variant="secondary">
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

export const PlayerPage = () => {
  const video = useLoaderData() as VideoDetailsType;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { userId } = useAppStore();
  const incrementViews = useSetAtom(incrementViewsAtom);
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const goBack = useGoBack();
  const [isPlaying, setIsPlaying] = useState(false);

  const trackView = useCallback(async () => {
    if (!userId || !video?.author_id || !video?.id) return;

    const { error } = await viewVideo(video.id, userId, video.author_id);

    if (!error) {
      incrementViews({
        videoId: video.id,
        authorId: video.author_id,
      });
    }
  }, [incrementViews, userId, video?.author_id, video?.id]);

  useEffect(() => {
    if (videoRef.current && video.video_source) {
      videoRef.current.addEventListener('play', () => {
        setIsPlaying(true);
      });
      videoRef.current.addEventListener('pause', () => {
        setIsPlaying(false);
      });
      videoRef.current.addEventListener('error', () => {
        setIsPlaying(false);
        setError('An error occurred while loading the video :(');
      });

      videoRef.current.addEventListener('error', () => {
        setError('An error occurred while loading the video :(');
      });

      if (Hls.isSupported()) {
        const hls = new Hls({
          autoStartLoad: true,
        });
        hls.loadSource(video.video_source);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (videoRef.current) {
            videoRef.current.play().then(() => {
              setIsPlaying(true);
              if (videoRef.current) {
                videoRef.current.muted = false;
              }
              return trackView();
            });
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
      } else if (
        videoRef.current.canPlayType('application/vnd.apple.mpegurl')
      ) {
        if (video?.video_source) {
          videoRef.current.src = video.video_source;
          videoRef.current.preload = 'metadata';

          videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current?.play().then(() => {
              setIsPlaying(true);
              if (videoRef.current) {
                videoRef.current.muted = false;
              }
              return trackView();
            });
          });
        }
      }
    }
  }, [trackView, video?.video_source]);

  const handleClose = useCallback(() => {
    goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        padding:
          'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      }}
      ref={containerRef}
      className="relative w-full"
    >
      <div className="relative h-full bg-dark">
        {!error ? (
          <div className="absolute inset-0">
            <video
              className="w-full h-full"
              ref={videoRef}
              muted
              controls
              playsInline
            ></video>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-bold leading-1.5">
            {error}
          </div>
        )}
      </div>
      <VideoControlBar
        title={video.title}
        videoId={video.id}
        share_url={video.share_url}
        handleClose={handleClose}
        isPlaying={isPlaying}
      />
    </div>
  );
};
