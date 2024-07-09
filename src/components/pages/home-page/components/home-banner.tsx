import styles from './styles/index.module.scss';
import { Typography } from '../../../ui/typography';
import { Button } from '../../../ui/button';
import { text } from '../../../../lib/text.ts';
import { VideoStats } from '../../../elements/video-stats';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../../../../lib/page-routes.ts';
import { PlayBtn } from '../../video-details-page/components/play-btn.tsx';
import { useAtomValue } from 'jotai';
import { featuredVideoAtom } from '../../../../lib/jotai/atoms/videos/featuredVideo.ts';
import { Avatar } from '../../../elements/avatar';
import { Suspense } from 'react';
import { AvatarSkeleton } from '../../../elements/avatar/avatar-skeleton.tsx';

export const HomeBanner = () => {
  const navigate = useNavigate();
  const featuredVideo = useAtomValue(featuredVideoAtom);

  if (!featuredVideo) {
    return null;
  }

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
          <Avatar id={featuredVideo.author_id} className="mb-2 self-start" />
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
            <PlayBtn videoId={featuredVideo.id} />
            <Button
              variant="tertiary"
              onClick={() => {
                navigate(pageRoutes.video.details(featuredVideo.id));
              }}
            >
              {text.moreInfo}
            </Button>
          </div>
          <VideoStats
            className="ml-auto"
            // views={supabaseVideo?.stats.views_count ?? 0}
            views={featuredVideo.stats.views_count ?? 0}
            // likes={supabaseVideo?.stats.likes_count ?? 0}
            likes={featuredVideo.stats.likes_count ?? 0}
          />
        </div>
      </div>
    </div>
  );
};
