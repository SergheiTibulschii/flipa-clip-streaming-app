import styles from './styles/index.module.scss';
import { Typography } from '../../../ui/typography';
import { Button } from '../../../ui/button';
import { text } from '../../../../lib/text.ts';
import { VideoStats } from '../../../elements/video-stats';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../../../../lib/page-routes.ts';
import { PlayBtn } from '../../../elements/play-btn.tsx';
import { Suspense } from 'react';
import { AvatarSkeleton } from '../../../elements/avatar/avatar-skeleton.tsx';
import { sendMessage } from '../../../../lib/utils/tracking.ts';
import { useVideoStats } from '../../../../lib/jotai/hooks/useVideoStats.ts';
import { StaticAvatar } from '../../../elements/avatar/static-avatar.tsx';
import { Creator } from '../../../../lib/types/flipa-clip-api-types.ts';
import { BannerDescription } from './banner-description.tsx';
import { Video } from '../../../ui/video';

type HomeBannerProps = {
  videoId: string;
  title: string;
  previewUrl: string;
  coverUrl: string;
  description?: string;
  author: Creator;
};

export const HomeBanner = ({
  videoId,
  title,
  description,
  coverUrl,
  previewUrl,
  author,
}: HomeBannerProps) => {
  const navigate = useNavigate();
  const { views_count, likes_count } = useVideoStats(videoId);

  const handlePlayBtnClick = () => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'feature_banner',
        id: videoId,
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
        id: videoId,
        action: 'open',
        type: 'media',
      },
    });
    navigate(pageRoutes.video.details(videoId));
  };

  const handleAvatarClick = (authorId: string) => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'feature_banner',
        id: authorId,
        action: 'open',
        type: 'creator',
      },
    });
  };

  return (
    <div className={styles['home-banner']}>
      <div className={styles['home-banner__background']}>
        <Video src={previewUrl} thumbnail={coverUrl} />
      </div>
      <div className={styles['home-banner__content']}>
        {author && (
          <Suspense fallback={<AvatarSkeleton />}>
            <StaticAvatar
              avatar={author.avatar}
              name={author.name}
              id={author.id}
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
          <BannerDescription text={description} className="mt2" />
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
