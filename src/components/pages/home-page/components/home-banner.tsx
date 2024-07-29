import styles from './styles/index.module.scss';
import { Typography } from '../../../ui/typography';
import { Button } from '../../../ui/button';
import { text } from '../../../../lib/text.ts';
import { VideoStats } from '../../../elements/video-stats';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../../../../lib/page-routes.ts';
import { PlayBtn } from '../../../elements/play-btn.tsx';
import { Avatar } from '../../../elements/avatar';
import { Suspense } from 'react';
import { AvatarSkeleton } from '../../../elements/avatar/avatar-skeleton.tsx';
import { sendMessage } from '../../../../lib/utils/tracking.ts';
import { IdType } from '../../../../lib/types';
import { useVideoStats } from '../../../../lib/jotai/hooks/useVideoStats.ts';

type HomeBannerProps = {
  videoId: string;
  title: string;
  previewUrl: string;
  coverUrl: string;
  description?: string;
  authorId?: string;
};

export const HomeBanner = ({
  videoId,
  title,
  description,
  coverUrl,
  authorId,
}: HomeBannerProps) => {
  const navigate = useNavigate();
  const { views_count, likes_count } = useVideoStats(videoId);

  const handlePlayBtnClick = () => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'feature_banner',
        id: String(videoId),
        action: 'play',
        type: 'media',
      },
    });
  };

  const handleMoreInfoClick = () => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'feature_banner',
        id: String(videoId),
        action: 'open',
        type: 'media',
      },
    });
    navigate(pageRoutes.video.details(videoId));
  };

  const handleAvatarClick = (authorId: IdType) => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'feature_banner',
        id: String(authorId),
        action: 'open',
        type: 'creator',
      },
    });
  };

  return (
    <div className={styles['home-banner']}>
      <div className={styles['home-banner__background']}>
        <img
          fetchPriority="high"
          className="image"
          src={coverUrl}
          alt="Hero Banner"
        />
      </div>
      <div className={styles['home-banner__content']}>
        {authorId && (
          <Suspense fallback={<AvatarSkeleton />}>
            <Avatar
              id={authorId}
              className="mb-2 self-start"
              onClick={handleAvatarClick}
            />
          </Suspense>
        )}
        <Typography
          className="line-clamp-2 max-w-[80%] capitalize"
          variant="h4"
        >
          {title}
        </Typography>
        {description && (
          <Typography
            className="line-clamp-2 max-w-[80%] mt-1"
            variant="body1"
            title={description}
          >
            {description}
          </Typography>
        )}
        <div className={styles['home-banner__controls']}>
          <div className="flex gap-1 sm:gap-2">
            <PlayBtn videoId={videoId} onClick={handlePlayBtnClick} />
            <Button variant="tertiary" onClick={handleMoreInfoClick}>
              {text.moreInfo}
            </Button>
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
