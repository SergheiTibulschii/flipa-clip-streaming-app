import { Typography } from '../../../ui/typography';
import clsx from 'clsx';

const characterLimit = 110;

type BannerDescriptionProps = {
  text: string;
  className?: string;
};

export const BannerDescription = ({
  text: originalText,
  className,
}: BannerDescriptionProps) => {
  const cn = clsx('line-clamp-2 max-w-[80%]', className);
  const text = originalText.slice(0, characterLimit);

  return (
    <Typography className={cn} variant="body1" title={text}>
      {text}
      {originalText.length > characterLimit && '...'}
    </Typography>
  );
};
