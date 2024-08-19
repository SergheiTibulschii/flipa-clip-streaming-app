import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../../context/app-store-context';
import { useSetAtom } from 'jotai/index';
import { viewVideo } from '../../../lib/supabase/viewVideo.ts';
import { VideoDetailsType } from '../../../lib/types/flipa-clip-api-types.ts';
import { incrementViewsAtom } from '../../../lib/jotai/atoms/incrementViews.atom.ts';
import { IconButton } from '../../ui/button/icon-button.tsx';
import { CloseIcon } from '../../icons.ts';
import { useGoBack } from '../../../lib/hooks/useGoBack.ts';
import Hls from 'hls.js';
import useSWR from 'swr';
import { apiV1 } from '../../../api/axios';
import { routes } from '../../../api';
import { debounce } from '../../../lib/utils/debounce.ts';

type VideoControlBarProps = {
  handleClose: () => void;
  isVisible: boolean;
};

const VideoControlBar = ({ handleClose, isVisible }: VideoControlBarProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translateY(${isVisible ? '0' : '-100%'})`;
      ref.current.style.opacity = isVisible ? '1' : '0';
    }
  }, [isVisible]);

  return (
    <div
      ref={ref}
      style={{
        top: 'env(safe-area-inset-top, 0)',
      }}
      className="absolute left-0 w-full bg-dark text-white px-5 py-3 transition-all duration-500"
    >
      <IconButton onClick={handleClose} variant="secondary">
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export const PlayerPage = () => {
  const params = useParams();
  const { data: video } = useSWR(`play-video-${params.videoId}`, async () =>
    apiV1
      .get<VideoDetailsType>(routes.videos.one(params.videoId || ''))
      .then((r) => r.data)
      .catch(() => null)
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { userId } = useAppStore();
  const incrementViews = useSetAtom(incrementViewsAtom);
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const goBack = useGoBack();
  const [showControlBar, setShowControlBar] = useState(false);
  const hideTimeoutRef = useRef<number | null>(null);

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

  const handleClose = useCallback(() => {
    goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (videoRef.current && video && video.video_source) {
      const handleMove = debounce(() => {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }

        setShowControlBar(true);

        hideTimeoutRef.current = window.setTimeout(() => {
          setShowControlBar(false);
        }, 3000);
      }, 150);

      videoRef.current.addEventListener('mousemove', handleMove);
      videoRef.current.addEventListener('touchstart', handleMove);
      videoRef.current.addEventListener('ended', handleClose);

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
              if (videoRef.current) {
                videoRef.current.muted = false;
              }
              return trackView();
            });
          });
        }
      }

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('mousemove', handleMove);
          videoRef.current.removeEventListener('touchstart', handleMove);
          videoRef.current.removeEventListener('ended', handleClose);
        }
      };
    }
  }, [trackView, video?.video_source]);

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
              disablePictureInPicture
              controlsList="nodownload noplaybackrate nofullscreen"
            ></video>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-bold leading-1.5">
            {error}
          </div>
        )}
      </div>
      <VideoControlBar handleClose={handleClose} isVisible={showControlBar} />
    </div>
  );
};
