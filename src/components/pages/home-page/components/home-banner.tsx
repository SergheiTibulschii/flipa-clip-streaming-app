import styles from './styles/index.module.scss';
import { Typography } from '../../../ui/typography';
import { Button } from '../../../ui/button';
import { text } from '../../../../lib/text.ts';
import { abbreviateNumber } from '../../../../lib/utils/number.ts';

type HomeBannerProps = {
  title: string;
  description: string;
  backgroundImageSrc?: string;
  likes?: number;
  views?: number;
  creator: {
    name: string;
    avatar?: string;
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
          className="w-full h-full object-cover"
          src={backgroundImageSrc}
          alt="Hero Banner"
        />
        <div className={styles['home-banner__background-overlay']}></div>
      </div>
      <div className={styles['home-banner__content']}>
        <div className="flex items-center gap-2 mb-2">
          <div className={styles['home-banner__avatar-image']}>
            <img src={creator.avatar} alt={`${creator.name}'s avatar`} />
          </div>
          <div className={styles['home-banner__avatar-creator']}>
            {creator.name}
          </div>
        </div>
        <Typography className="max-w-[80%]" variant="h4">
          {title}
        </Typography>
        <Typography
          className="max-md:line-clamp-2 md:truncate max-w-[80%] mt-1"
          variant="body1"
        >
          {description}
        </Typography>
        <div className={styles['home-banner__controls']}>
          <div className="flex gap-1 xsm:gap-2">
            <Button>{text.play}</Button>
            <Button variant="tertiary">{text.moreInfo}</Button>
          </div>
          <div className="ml-auto flex flex-wrap justify-end items-center gap-2 text-left truncate">
            <span className={styles['home-banner__stat']} title={text.likes}>
              ❤️ {abbreviateNumber(likes)}{' '}
              <span className="max-sm:hidden">{text.likes}</span>
            </span>
            <span className={styles['home-banner__stat']} title={text.views}>
              🔥 {abbreviateNumber(views)}{' '}
              <span className="max-sm:hidden">{text.views}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
