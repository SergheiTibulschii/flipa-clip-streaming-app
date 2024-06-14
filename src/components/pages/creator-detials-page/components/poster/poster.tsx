import styles from './styles/index.module.scss';
import { IconButton } from '../../../../ui/button/icon-button.tsx';
import { CaretLeftIcon } from '../../../../icons.ts';

type PosterProps = {
  poster: string;
};

export const Poster = ({ poster }: PosterProps) => {
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
          <IconButton variant="secondary">
            <CaretLeftIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
