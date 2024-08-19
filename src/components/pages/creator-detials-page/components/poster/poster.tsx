import styles from './styles/index.module.scss';
import { IconButton } from '../../../../ui/button/icon-button.tsx';
import { CaretLeftIcon } from '../../../../icons.ts';
import { useGoBack } from '../../../../../lib/hooks/useGoBack.ts';
import { useEffect, useState } from 'react';
import { Image } from '../../../../ui/image.tsx';

type PosterProps = {
  poster: string;
  authorId: string;
};

export const Poster = ({ poster, authorId }: PosterProps) => {
  const goBack = useGoBack();
  const [showFallback, setShowFallback] = useState(!poster);

  useEffect(() => {
    setShowFallback(false);
  }, [authorId]);

  return (
    <div className={styles.poster}>
      <div className={styles.poster__background}>
        <div className="aspect-video">
          {poster && !showFallback ? (
            <Image
              src={poster}
              alt=""
              fetchPriority="high"
              onError={() => {
                setShowFallback(true);
              }}
              className="image object-right absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
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
      </div>
    </div>
  );
};
