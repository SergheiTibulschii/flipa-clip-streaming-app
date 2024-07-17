import styles from './styles/index.module.scss';
import { Typography } from '../../../ui/typography';
import { Button } from '../../../ui/button';
import { text } from '../../../../lib/text.ts';
import { VideoStats } from '../../../elements/video-stats';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../../../../lib/page-routes.ts';
import { PlayBtn } from '../../../elements/play-btn.tsx';
import { useAtomValue } from 'jotai';
import { featuredVideoAtom } from '../../../../lib/jotai/atoms/videos/featuredVideo.ts';
import { Avatar } from '../../../elements/avatar';
import { Suspense } from 'react';
import { AvatarSkeleton } from '../../../elements/avatar/avatar-skeleton.tsx';
import { sendMessage } from '../../../../lib/utils/tracking.ts';
import { IdType } from '../../../../lib/types';

export const HomeBanner = () => {
  const navigate = useNavigate();
  const featuredVideo = useAtomValue(featuredVideoAtom);

  if (!featuredVideo) {
    return null;
  }

  const handlePlayBtnClick = () => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'feature_banner',
        id: String(featuredVideo.id),
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
        id: String(featuredVideo.id),
        action: 'open',
        type: 'media',
      },
    });
    navigate(pageRoutes.video.details(featuredVideo.id));
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
          src={featuredVideo.artwork_url}
          alt="Hero Banner"
        />
      </div>
      <div className={styles['home-banner__content']}>
        <Suspense fallback={<AvatarSkeleton />}>
          <Avatar
            id={featuredVideo.author_id}
            className="mb-2 self-start"
            onClick={handleAvatarClick}
          />
        </Suspense>
        <Typography
          className="line-clamp-2 max-w-[80%] capitalize"
          variant="h4"
        >
          {featuredVideo.title}
        </Typography>
        <Typography
          className="line-clamp-2 max-w-[80%] mt-1"
          variant="body1"
          title={featuredVideo.description}
        >
          {featuredVideo.description}
        </Typography>
        <div className={styles['home-banner__controls']}>
          <div className="flex gap-1 sm:gap-2">
            <PlayBtn videoId={featuredVideo.id} onClick={handlePlayBtnClick} />
            <Button variant="tertiary" onClick={handleMoreInfoClick}>
              {text.moreInfo}
            </Button>
          </div>
          <VideoStats
            className="ml-auto"
            views={featuredVideo.stats.views_count ?? 0}
            likes={featuredVideo.stats.likes_count ?? 0}
          />
        </div>
      </div>
    </div>
  );
};
