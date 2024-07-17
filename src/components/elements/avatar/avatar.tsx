import styles from './styles/index.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../lib/page-routes.ts';
import { routes } from '../../../api';
import { useApi } from '../../../api/swr';
import { AuthorType } from '../../../lib/types/authors.ts';
import { IdType } from '../../../lib/types';

type AvatarProps = {
  name?: string;
  thumbnail?: string;
  className?: string;
  id: number | string;
  onClick?: (authorId: IdType) => void;
};

export const Avatar = ({ id, className, onClick }: AvatarProps) => {
  const { data } = useApi<AuthorType>(routes.authors.one(id), {
    suspense: true,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });
  const cns = clsx(styles.avatar, className);

  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <Link
      to={pageRoutes.creator.details(id)}
      className={cns}
      onClick={handleClick}
    >
      <div className={styles['avatar__image']}>
        <img src={data?.picture} alt={`${data?.name}'s avatar`} />
      </div>
      {data?.name && (
        <div className={styles['avatar__creator']} title={data?.name}>
          {data?.name}
        </div>
      )}
    </Link>
  );
};
