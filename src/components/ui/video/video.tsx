import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

type VideoProps = {
  src: string;
  thumbnail: string;
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  playsinline?: boolean;
};

export const Video = ({
  src,
  thumbnail,
  autoplay = true,
  muted = autoplay,
  playsinline = true,
  controls = false,
}: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && src) {
      videoRef.current.addEventListener('ended', function () {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
      });

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (videoRef.current) {
            videoRef.current.play();
          }
        });

        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType('application/vnd.apple.mpegurl')
      ) {
        if (src) {
          videoRef.current.src = src;
          videoRef.current.preload = 'metadata';

          videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current?.play();
          });
        }
      }
    }
  }, [src]);

  return (
    <>
      <video
        className="w-full h-full object-cover"
        ref={videoRef}
        controls={controls}
        playsInline={playsinline}
        autoPlay={autoplay}
        muted={muted}
        poster={thumbnail}
      ></video>
    </>
  );
};
