import { useEffect, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import videojs, { VideoJsPlayer } from 'video.js';
import 'video.js/dist/video-js.css';

type VideoProps = {
  src: string;
  thumbnail: string;
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  playsinline?: boolean;
};

export const Video = ({ src, thumbnail }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);

  useEffect(() => {
    if (videoRef.current && src) {
      videoRef.current.style.objectFit = 'cover';
      playerRef.current = videojs(videoRef.current, {
        controls: false,
        autoplay: true,
        preload: 'auto',
        muted: true,
        controlBar: {
          fullscreenToggle: false,
          volumePanel: false,
          pictureInPictureToggle: false,
        },
        loop: true,
        sources: [
          {
            src,
            type: 'application/x-mpegURL',
          },
        ],
        bigPlayButton: false,
        playsinline: true,
        responsive: true,
        disablePictureInPicture: true,
        poster: thumbnail,
      });
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="video-js w-full h-full object-cover"
    ></video>
  );
};
