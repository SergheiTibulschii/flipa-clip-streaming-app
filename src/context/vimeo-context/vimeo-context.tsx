import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Player from '@vimeo/player';
import { CloseIcon, ShareIcon } from '../../components/icons.ts';
import { IconButton } from '../../components/ui/button/icon-button.tsx';
import { createPortal } from 'react-dom';
import { VimeoContext } from './context.ts';

const prepareLink = (url: string) => {
  const videoLink = new URL(url);
  videoLink.searchParams.set('playsinline', '1');
  videoLink.searchParams.set('transparent', '0');
  videoLink.searchParams.set('byline', '0');
  videoLink.searchParams.set('portrait', '0');
  videoLink.searchParams.set('title', '0');
  return videoLink.toString();
};

type VimeoEmbeddingProps = { source: string; onClose: () => void };
const VimeoEmbedding = ({ source, onClose }: VimeoEmbeddingProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLIFrameElement | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>();
  const vimeoUrl = prepareLink(decodeURIComponent(source));

  const handleClose = useCallback(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

type VimeoProviderProps = PropsWithChildren<unknown>;

export const VimeoProvider = ({ children }: VimeoProviderProps) => {
  const [source, setSource] = useState<string | null>(null);

  const play = useCallback((source: string) => {
    setSource(encodeURIComponent(source));
  }, []);

  const contextValue = useMemo(
    () => ({
      play,
    }),
    [play]
  );

  return (
    <VimeoContext.Provider value={contextValue}>
      <>
        {children}
        {source && (
          <VimeoEmbedding source={source} onClose={() => setSource(null)} />
        )}
      </>
    </VimeoContext.Provider>
  );
};
