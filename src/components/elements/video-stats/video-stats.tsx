import { text } from '../../../lib/text.ts';
import { abbreviateNumber } from '../../../lib/utils/number.ts';
import clsx from 'clsx';
import styles from './styles/index.module.scss';

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
  const cns = clsx(styles.stats, className);

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
