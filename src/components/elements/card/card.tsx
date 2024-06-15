import styles from './styles/index.module.scss';
import { abbreviateNumber } from '../../../lib/utils/number.ts';
import { text } from '../../../lib/text.ts';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../lib/page-routes.ts';
import clsx from 'clsx';

type CardProps = {
  title: string;
  id: number | string;
  likes?: number;
  views?: number;
  coverImageSrc?: string;
  className?: string;
};

export const Card = ({
  title,
  id,
  views = 0,
  likes = 0,
  coverImageSrc,
  className,
}: CardProps) => {
  const cns = clsx('block', className);
  return (
    <Link
      to={pageRoutes.video.details(id)}
      role="button"
      tabIndex={0}
      aria-label={title}
      title={title}
      className={cns}
    >
      <div className={styles.card__cover}>
        <img className="image" src={coverImageSrc} alt="" />
      </div>
      <div className="px-2">
        <div className={`${styles.card__title} mt-2 line-clamp-2 capitalize`}>
          {title}
        </div>
        <div className="mt-1 text-[9px] text-gray-secondary font-bold">
          <span>
            {abbreviateNumber(likes)} {text.likes}
          </span>
          <span className="ml-1">
            {abbreviateNumber(views)} {text.views}
          </span>
        </div>
      </div>
    </Link>
  );
};
