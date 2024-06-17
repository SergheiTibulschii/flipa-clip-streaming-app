import { text } from '../../lib/text.ts';
import { abbreviateNumber } from '../../lib/utils/number.ts';
import clsx from 'clsx';

type VideoStatsProps = {
  likes?: number;
  views?: number;
  className?: string;
};

export const VideoStats = ({
  likes = 0,
  views = 0,
  className,
}: VideoStatsProps) => {
  const cns = clsx(className);

  return (
    <div className={cns}>
      <span className="text-sm leading-1.5" title={text.likes}>
        ❤️ {abbreviateNumber(likes)}{' '}
        <span className="max-xsm:hidden">{text.likes}</span>
      </span>
      <span className="text-sm leading-1.5" title={text.views}>
        🔥 {abbreviateNumber(views)}{' '}
        <span className="max-xsm:hidden">{text.views}</span>
      </span>
    </div>
  );
};
