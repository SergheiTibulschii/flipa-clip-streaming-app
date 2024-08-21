import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../../context/app-store-context';
import { useSetAtom } from 'jotai/index';
import { viewVideo } from '../../../lib/supabase/viewVideo.ts';
import { VideoDetailsType } from '../../../lib/types/flipa-clip-api-types.ts';
import { incrementViewsAtom } from '../../../lib/jotai/atoms/incrementViews.atom.ts';
import { CloseIcon, PlaySvg } from '../../icons.ts';
import { useGoBack } from '../../../lib/hooks/useGoBack.ts';
import useSWR from 'swr';
import { apiV1 } from '../../../api/axios';
import { routes } from '../../../api';
import { debounce } from '../../../lib/utils/debounce.ts';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import videojs, { VideoJsPlayer } from 'video.js';
import 'video.js/dist/video-js.css';
import { IconButton } from '../../ui/button/icon-button.tsx';

type VideoControlBarProps = {
  handleClose: () => void;
  isVisible: boolean;
};

const VideoControlBar = ({ handleClose, isVisible }: VideoControlBarProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.opacity = isVisible ? '1' : '0';
    }
  }, [isVisible]);

  return (
    <div
      ref={ref}
      style={{
        paddingTop: 'calc(env(safe-area-inset-top, 0) + 1rem)',
      }}
      className="absolute left-0 top-0 w-full text-white transition-all opacity-0 duration-500 pl-4"
    >
      <IconButton onClick={handleClose} variant="secondary">
        <CloseIcon className="h-4 w-4 lg:w-6 lg:h-6" />
      </IconButton>
    </div>
  );
};

export const PlayerPage = () => {
  const params = useParams();
  const { data: video } = useSWR(
    `video-details-${params.videoId}`,
    async () =>
      apiV1
        .get<VideoDetailsType>(routes.videos.one(params.videoId || ''))
        .then((r) => r.data)
        .catch(() => null),
    {
      revalidateIfStale: false,
    }
  );
  const { userId } = useAppStore();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);
  const incrementViews = useSetAtom(incrementViewsAtom);
  const goBack = useGoBack();
  const [showControlBar, setShowControlBar] = useState(false);
  const hideTimeoutRef = useRef<number | null>(null);
  const [showPlayBtn, setShowPlayBtn] = useState(false);
  const firstPlayRef = useRef(true);

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
    if (!playerRef.current && videoRef.current && video?.video_source) {
      playerRef.current = videojs(
        videoRef.current,
        {
          controls: true,
          autoplay: true,
          preload: 'auto',
          muted: true,
          controlBar: {
            fullscreenToggle: false,
            volumePanel: false,
            pictureInPictureToggle: false,
          },
          nativeControlsForTouch: false,
          sources: [
            {
              src: video?.video_source,
              type: 'application/x-mpegURL',
            },
          ],
          bigPlayButton: false,
          playsinline: true,
          responsive: true,
          disablePictureInPicture: true,
        },
        () => {
          playerRef.current?.muted(false);
          playerRef.current?.play()?.catch(() => {
            setShowPlayBtn(true);
          });
        }
      );

      const handleMove = debounce(() => {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }

        setShowControlBar(true);

        hideTimeoutRef.current = window.setTimeout(() => {
          setShowControlBar(false);
        }, 2500);
      }, 100);

      const handlePause = () => {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
        setShowControlBar(true);
        playerRef.current?.pause();
      };

      const handlePlay = () => {
        handleMove();

        if (firstPlayRef.current) {
          trackView();
          firstPlayRef.current = false;
        }
      };

      const handleTouch = () => {
        if (playerRef.current?.paused()) {
          handlePlay();
        } else {
          handlePause();
        }
      };

      playerRef.current.on('mousemove', handleMove);
      playerRef.current.on('touchstart', handleTouch);
      playerRef.current.on('ended', handleClose);
      playerRef.current.on('play', handlePlay);
      playerRef.current.on('pause', handlePause);

      return () => {
        if (playerRef.current && !playerRef.current.isDisposed()) {
          playerRef.current.off('mousemove', handleMove);
          playerRef.current.off('touchstart', handleMove);
          playerRef.current.off('ended', handleClose);
          playerRef.current.off('play', handleMove);
          playerRef.current.off('pause', handlePause);
          playerRef.current.dispose();
          playerRef.current = null;
        }
      };
    }
  }, [videoRef, video?.video_source]);

  return (
    <div className="contents">
      <video
        ref={videoRef}
        className="video-js w-full h-auto object-cover"
      ></video>

      {showPlayBtn && (
        <button
          type="button"
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white outline-none border-none"
          onClick={() => {
            playerRef.current?.play();
            setShowPlayBtn(false);
          }}
        >
          <PlaySvg width={48} height={48} />
        </button>
      )}

      <VideoControlBar handleClose={handleClose} isVisible={showControlBar} />
    </div>
  );
};
