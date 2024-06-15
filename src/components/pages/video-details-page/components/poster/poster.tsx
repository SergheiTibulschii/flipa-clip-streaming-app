import styles from './styles/index.module.scss';
import { IconButton } from '../../../../ui/button/icon-button.tsx';
import { CaretLeftIcon, HeartIcon, ShareIcon } from '../../../../icons.ts';
import { Button } from '../../../../ui/button';
import { text } from '../../../../../lib/text.ts';
import { VideoStats } from '../../../../elements/video-stats.tsx';
import { useGoBack } from '../../../../../lib/hooks/useNavigationGuard.ts';

type PosterProps = {
  poster: string;
  likes?: number;
  views?: number;
};

export const Poster = ({ poster, views, likes }: PosterProps) => {
  const goBack = useGoBack();
  return (
    <div className={styles.poster}>
      <div className={styles.poster__background}>
        <div className="aspect-video">
          <img
            src={poster}
            alt=""
            fetchPriority="high"
            className="image absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
          />
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
            <Button>{text.play}</Button>
            <IconButton variant="secondary">
              <HeartIcon />
            </IconButton>
            <IconButton variant="secondary">
              <ShareIcon />
            </IconButton>
          </div>
          <VideoStats className="ml-auto" views={views} likes={likes} />
        </div>
      </div>
    </div>
  );
};
