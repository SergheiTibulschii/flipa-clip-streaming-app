import { Children, cloneElement, PropsWithChildren, ReactElement } from 'react';
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
        className={styles.carousel}
        breakpoints={{
          0: {
            spaceBetween: 16,
          },
          [screens.xsm]: {
            spaceBetween: 16,
          },
          [screens.md]: {
            spaceBetween: 16,
          },
        }}
        slidesPerView="auto"
        resizeObserver
      >
        {Children.map(children, (child) =>
          cloneElement(
            child as ReactElement,
            {
              className: 'w-[144px] aspect-[144/214]',
            },
            null
          )
        )}
      </Carousel>
    </div>
  );
};
