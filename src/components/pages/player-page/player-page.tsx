import { useLoaderData } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../../context/app-store-context';
import { useSetAtom } from 'jotai/index';
import { viewVideo } from '../../../lib/supabase/viewVideo.ts';
import { VideoDetailsType } from '../../../lib/types/flipa-clip-api-types.ts';
import { incrementViewsAtom } from '../../../lib/jotai/atoms/incrementViews.atom.ts';
import Hls from 'hls.js';

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
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
    if (videoRef.current) {
      videoRef.current.addEventListener('error', () => {
        setError('An error occurred while loading the video :(');
      });

      if (Hls.isSupported()) {
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
      } else if (
        videoRef.current.canPlayType('application/vnd.apple.mpegurl')
      ) {
        videoRef.current.src = prepareLink(video?.video_source);
        videoRef.current.preload = 'metadata';

        videoRef.current.addEventListener('loadedmetadata', () => {
          videoRef.current?.play();
          trackView();
        });
      }
    }
  }, [trackView, video?.video_source]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative h-full bg-dark">
        {!error ? (
          <div className="absolute inset-0">
            <video className="w-full h-full" ref={videoRef} controls></video>
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
