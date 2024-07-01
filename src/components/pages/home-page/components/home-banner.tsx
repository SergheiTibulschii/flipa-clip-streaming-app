import styles from './styles/index.module.scss';
import { Typography } from '../../../ui/typography';
import { Button } from '../../../ui/button';
import { text } from '../../../../lib/text.ts';
import { Avatar } from '../../../elements/avatar';
import { VideoStats } from '../../../elements/video-stats';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../../../../lib/page-routes.ts';
import { PlayBtn } from '../../video-details-page/components/play-btn.tsx';
import { useSupabaseVideo } from '../../../../lib/hooks/useSupabaseVideo.ts';

type HomeBannerProps = {
  title: string;
  description: string;
  backgroundImageSrc?: string;
  likes?: number;
  views?: number;
  videoId: number | string;
  vimeoId: number;
  creator: {
    id: string | number;
    name: string;
    thumbnail?: string;
  };
};

export const HomeBanner = ({
  backgroundImageSrc,
  description,
  videoId,
  title,
  creator,
}: HomeBannerProps) => {
  const navigate = useNavigate();
  const supabaseVideo = useSupabaseVideo(String(videoId));

  return (
    <div className={styles['home-banner']}>
      <div className={styles['home-banner__background']}>
        <img
          fetchPriority="high"
          className="image"
          src={backgroundImageSrc}
          alt="Hero Banner"
        />
      </div>
      <div className={styles['home-banner__content']}>
        <Avatar
          id={creator.id}
          className="mb-2 self-start"
          name={creator.name}
          thumbnail={creator.thumbnail}
        />
        <Typography
          className="line-clamp-2 max-w-[80%] capitalize"
          variant="h4"
        >
          {title}
        </Typography>
        <Typography
          className="line-clamp-2 max-w-[80%] mt-1"
          variant="body1"
          title={description}
        >
          {description}
        </Typography>
        <div className={styles['home-banner__controls']}>
          <div className="flex gap-1 sm:gap-2">
            <PlayBtn
              authorId={creator.id}
              videoId={videoId}
              videoLink="https://player.vimeo.com/video/952448399?h=f66b6ba1cb"
            />
            <Button
              variant="tertiary"
              onClick={() => {
                navigate(pageRoutes.video.details(videoId));
              }}
            >
              {text.moreInfo}
            </Button>
          </div>
          <VideoStats
            className="ml-auto"
            views={supabaseVideo?.views_count ?? 0}
            likes={supabaseVideo?.likes_count ?? 0}
          />
        </div>
      </div>
    </div>
  );
};
