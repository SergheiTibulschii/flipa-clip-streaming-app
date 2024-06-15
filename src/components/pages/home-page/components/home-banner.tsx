import styles from './styles/index.module.scss';
import { Typography } from '../../../ui/typography';
import { Button } from '../../../ui/button';
import { text } from '../../../../lib/text.ts';
import { Avatar } from '../../../elements/avatar';
import { VideoStats } from '../../../elements/video-stats.tsx';

type HomeBannerProps = {
  title: string;
  description: string;
  backgroundImageSrc?: string;
  likes?: number;
  views?: number;
  creator: {
    id: string | number;
    name: string;
    thumbnail?: string;
  };
};

export const HomeBanner = ({
  backgroundImageSrc,
  description,
  title,
  creator,
  views = 0,
  likes = 0,
}: HomeBannerProps) => {
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
          className="mb-2"
          name={creator.name}
          thumbnail={creator.thumbnail}
        />
        <Typography className="max-w-[80%] capitalize" variant="h4">
          {title}
        </Typography>
        <Typography
          className="max-lg:line-clamp-2 lg:truncate max-w-[80%] mt-1"
          variant="body1"
          title={description}
        >
          {description}
        </Typography>
        <div className={styles['home-banner__controls']}>
          <div className="flex gap-1 sm:gap-2">
            <Button>{text.play}</Button>
            <Button variant="tertiary">{text.moreInfo}</Button>
          </div>
          <VideoStats className="ml-auto" views={views} likes={likes} />
        </div>
      </div>
    </div>
  );
};
