import { PropsWithChildren } from 'react';
import { Carousel } from '../../ui/carousel';
import { screens } from '../../../lib/screens.ts';
import styles from './styles/index.module.scss';

type StandardCarouselProps = PropsWithChildren<{
  title?: string;
}>;

export const StandardCarousel = ({
  title,
  children,
}: StandardCarouselProps) => {
  return (
    <div>
      {title && <div className="font-bold leading-1.5 mb-6">{title}</div>}
      <Carousel
        key={Math.random()}
        className={styles.carousel}
        breakpoints={{
          0: {
            slidesPerView: 2.1,
            spaceBetween: 16,
          },
          [screens.xsm]: {
            slidesPerView: 2.5,
            spaceBetween: 16,
          },
          [screens.md]: {
            slidesPerView: 4.5,
            spaceBetween: 16,
          },
        }}
        resizeObserver
      >
        {children}
      </Carousel>
    </div>
  );
};
