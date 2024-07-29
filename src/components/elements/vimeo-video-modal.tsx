import { useCallback, useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';
import { createPortal } from 'react-dom';
import { IconButton } from '../ui/button/icon-button.tsx';
import { CloseIcon, ShareIcon } from '../icons.ts';
import { viewVideo } from '../../lib/supabase/viewVideo.ts';
import { useAppStore } from '../../context/app-store-context';
import { useSetAtom } from 'jotai/index';
import { IdType } from '../../lib/types';
import { incrementViewsAtom } from '../../lib/jotai/atoms/incrementViews.atom.ts';

const prepareLink = (url: string) => {
  const videoLink = new URL(url);
  videoLink.searchParams.set('playsinline', '1');
  videoLink.searchParams.set('transparent', '0');
  videoLink.searchParams.set('byline', '0');
  videoLink.searchParams.set('portrait', '0');
  videoLink.searchParams.set('title', '0');
  return videoLink.toString();
};

type VimeoEmbeddingProps = {
  source: string;
  videoId: IdType;
  authorId: IdType;
  onClose: () => void;
};
export const VimeoVideoModal = ({
  source,
  onClose,
  videoId,
  authorId,
}: VimeoEmbeddingProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLIFrameElement | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>();
  const vimeoUrl = prepareLink(decodeURIComponent(source));
  const { userId } = useAppStore();
  const incrementViews = useSetAtom(incrementViewsAtom);

  const handleClose = useCallback(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const trackView = async () => {
      const { error } = await viewVideo(
        String(videoId),
        userId,
        String(authorId)
      );

      if (!error) {
        incrementViews({
          videoId: String(videoId),
          authorId: String(authorId),
        });
      }
    };

    trackView();
  }, []);

  useEffect(() => {
    if (ref.current) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      const newPlayer = new Player(ref.current);
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
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleClose]);

  return createPortal(
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
      <iframe
        ref={ref}
        className="relative flex-1"
        src={vimeoUrl}
        allowFullScreen
      ></iframe>
    </div>,
    document.body
  );
};
