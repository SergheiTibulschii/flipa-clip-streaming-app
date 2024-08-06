import styles from './styles/index.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../lib/page-routes.ts';
import { useState } from 'react';
import { UserSvg } from '../../icons.ts';
import { Creator } from '../../../lib/types/flipa-clip-api-types.ts';

type AvatarProps = Pick<Creator, 'id' | 'avatar' | 'name'> & {
  className?: string;
  onClick?: (authorId: string) => void;
};

export const StaticAvatar = ({
  id,
  avatar,
  name,
  className,
  onClick,
}: AvatarProps) => {
  const [showFallback, setShowFallback] = useState(false);
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
            src={avatar || ''}
            alt={`${name}'s avatar`}
            onError={() => {
              setShowFallback(true);
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-primary flex items-center justify-center text-accent">
            <UserSvg />
          </div>
        )}
      </div>
      {name && (
        <div className={styles['avatar__creator']} title={name}>
          {name}
        </div>
      )}
    </Link>
  );
};
