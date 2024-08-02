import styles from './styles/index.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../lib/page-routes.ts';
import { routes } from '../../../api';
import { useApi } from '../../../api/swr';
import { useState } from 'react';
import { UserSvg } from '../../icons.ts';
import { AuthorDetailsType } from '../../../lib/types/flipa-clip-api-types.ts';

type AvatarProps = {
  name?: string;
  thumbnail?: string;
  className?: string;
  id: string;
  onClick?: (authorId: string) => void;
};

export const Avatar = ({ id, className, onClick }: AvatarProps) => {
  const [showFallback, setShowFallback] = useState(false);
  const { data } = useApi<AuthorDetailsType>(routes.authors.one(id), {
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
        {!showFallback ? (
          <img
            src={data?.avatar || ''}
            alt={`${data?.name}'s avatar`}
            onError={() => {
              setShowFallback(true);
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-primary flex items-center justify-center text-pink">
            <UserSvg />
          </div>
        )}
      </div>
      {data?.name && (
        <div className={styles['avatar__creator']} title={data?.name}>
          {data?.name}
        </div>
      )}
    </Link>
  );
};
