import styles from './styles/index.module.scss';
import { IconButton } from '../../../../ui/button/icon-button.tsx';
import { CaretLeftIcon } from '../../../../icons.ts';
import { VideoStats } from '../../../../elements/video-stats';
import { useGoBack } from '../../../../../lib/hooks/useGoBack.ts';
import { PlayBtn } from '../../../../elements/play-btn.tsx';
import { LikeBtn } from '../../../../elements/like-btn.tsx';
import { useVideoDetails } from '../../../../../context/video-details-context';
import { ShareBtn } from '../../../../elements/share-btn.tsx';
import { sendMessage } from '../../../../../lib/utils/tracking.ts';
import { useVideoStats } from '../../../../../lib/jotai/hooks/useVideoStats.ts';
import { useEffect, useState } from 'react';

type PosterProps = {
  videoId: string;
  poster: string;
  authorId: string;
  shareUrl?: string;
};

export const Poster = ({
  videoId,
  poster,
  authorId,
  shareUrl,
}: PosterProps) => {
  const goBack = useGoBack();
  const { isLiked } = useVideoDetails();
  const { likes_count, views_count } = useVideoStats(videoId);
  const [showFallback, setShowFallback] = useState(!poster);

  useEffect(() => {
    setShowFallback(false);
  }, [videoId]);

  const handlePlayBtnClick = () => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'movie',
        id: videoId,
        action: 'play',
        type: 'media',
      },
    });
  };

  const handleLikeBtnClick = (liked: boolean) => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'movie',
        id: videoId,
        action: !liked ? 'unlike' : 'like',
        type: 'media',
      },
    });
  };

  const handleShareBtnClick = (id: string) => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'movie',
        id,
        action: 'share',
        type: 'media',
      },
    });
  };

  return (
    <div className={styles.poster}>
      <div className={styles.poster__background}>
        <div className="aspect-video">
          {poster && !showFallback ? (
            <img
              src={poster}
              alt=""
              fetchPriority="high"
              onError={() => {
                setShowFallback(true);
              }}
              className="image absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-pink to-violet"></div>
          )}
        </div>
      </div>
      <div className={styles.poster__content}>
        <div className="mb-auto">
          <IconButton onClick={goBack} variant="secondary">
            <CaretLeftIcon />
          </IconButton>
        </div>
        <div className="mt-auto flex gap-2">
          <div className="flex gap-2">
            <PlayBtn videoId={videoId} onClick={handlePlayBtnClick} />
            <LikeBtn
              key={videoId}
              videoId={videoId}
              isLikedDefault={isLiked}
              authorId={authorId}
              onClick={handleLikeBtnClick}
            />
            {shareUrl && (
              <ShareBtn
                shareUrl={shareUrl}
                videoId={videoId}
                onClick={handleShareBtnClick}
              />
            )}
          </div>
          <VideoStats
            className="ml-auto"
            views={views_count}
            likes={likes_count}
          />
        </div>
      </div>
    </div>
  );
};
