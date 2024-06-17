import {
  createContext,
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
import { Loader } from '../../components/ui/loader.tsx';

type VimeoEmbeddingProps = { id: number; onClose: () => void };
const VimeoEmbedding = ({ id, onClose }: VimeoEmbeddingProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLIFrameElement | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleClose]);

  return createPortal(
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
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        )}
        <iframe
          ref={ref}
          className="h-full w-full"
          src={`https://player.vimeo.com/video/${id}?playsinline=1&transparent=0&byline=0&portrait=0&title=0`}
          allowFullScreen
        ></iframe>
      </div>
    </div>,
    document.body
  );
};

type VimeoContextType = {
  play: (source: number) => void;
};

export const VimeoContext = createContext<VimeoContextType>(
  {} as VimeoContextType
);

type VimeoProviderProps = PropsWithChildren<unknown>;

export const VimeoProvider = ({ children }: VimeoProviderProps) => {
  const [id, setId] = useState<number | null>(null);

  const play = useCallback((id: number) => {
    setId(id);
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
        {id && <VimeoEmbedding id={id} onClose={() => setId(null)} />}
      </>
    </VimeoContext.Provider>
  );
};
