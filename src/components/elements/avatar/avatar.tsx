import styles from './styles/index.module.scss';
import clsx from 'clsx';

type AvatarProps = {
  name?: string;
  thumbnail?: string;
  className?: string;
};

export const Avatar = ({ thumbnail, name, className }: AvatarProps) => {
  const cns = clsx(styles.avatar, className);
  return (
    <div className={cns}>
      <div className={styles['avatar__image']}>
        <img src={thumbnail} alt={`${name}'s avatar`} />
      </div>
      {name && <div className={styles['avatar__creator']}>{name}</div>}
    </div>
  );
};
