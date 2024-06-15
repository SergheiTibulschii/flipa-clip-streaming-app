import styles from './styles/index.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../lib/page-routes.ts';

type AvatarProps = {
  name?: string;
  thumbnail?: string;
  className?: string;
  id: number | string;
};

export const Avatar = ({ id, thumbnail, name, className }: AvatarProps) => {
  const cns = clsx(styles.avatar, className);
  return (
    <Link to={pageRoutes.creator.details(id)} className={cns}>
      <div className={styles['avatar__image']}>
        <img src={thumbnail} alt={`${name}'s avatar`} />
      </div>
      {name && <div className={styles['avatar__creator']}>{name}</div>}
    </Link>
  );
};
