import styles from './styles/index.module.scss';
import { abbreviateNumber } from '../../../lib/utils/number.ts';
import { text } from '../../../lib/text.ts';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../lib/page-routes.ts';
import clsx from 'clsx';
import { useSupabaseVideo } from '../../../lib/hooks/useSupabaseVideo.ts';

type CardProps = {
  title: string;
  id: number | string;
  likes?: number;
  views?: number;
  coverImageSrc?: string;
  className?: string;
};

export const Card = ({ title, id, coverImageSrc, className }: CardProps) => {
  const supabaseVideo = useSupabaseVideo(String(id));
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
        <img className="image" src={coverImageSrc} alt="" loading="lazy" />
      </div>
      <div className="px-2">
        <div className={`${styles.card__title} mt-2 line-clamp-2 capitalize`}>
          {title}
        </div>
        <div className="mt-1 text-[9px] text-gray-secondary font-bold">
          <span>
            {abbreviateNumber(supabaseVideo?.stats.likes_count ?? 0)}{' '}
            {text.likes}
          </span>
          <span className="ml-1">
            {abbreviateNumber(supabaseVideo?.stats.views_count ?? 0)}{' '}
            {text.views}
          </span>
        </div>
      </div>
    </Link>
  );
};
