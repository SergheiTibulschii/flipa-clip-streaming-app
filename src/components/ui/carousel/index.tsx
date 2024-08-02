import type { SwiperProps } from 'swiper/react';
import { Children, ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

export type CarouselProps = SwiperProps & {
  children: ReactNode;
};

export function Carousel({ children, ...swiperProps }: CarouselProps) {
  return (
    <Swiper {...swiperProps}>
      {Children.map(children, (child) => (
        <SwiperSlide className="h-auto w-auto">{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}
