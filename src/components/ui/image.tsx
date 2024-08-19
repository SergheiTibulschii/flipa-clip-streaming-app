import { ImgHTMLAttributes, SyntheticEvent } from 'react';
import clsx from 'clsx';

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const Image = ({
  onLoad,
  className,
  alt = '',
  ...props
}: ImageProps) => {
  const cn = clsx(
    className,
    'opacity-0 transition-opacity duration-500 ease-out'
  );

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    onLoad && onLoad(event);

    (event.target as HTMLImageElement).style.opacity = '1';
  };

  return <img className={cn} onLoad={handleLoad} alt={alt} {...props} />;
};
