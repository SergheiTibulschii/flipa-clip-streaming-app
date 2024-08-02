import styles from './styles/index.module.scss';
import clsx from 'clsx';

export const AvatarSkeleton = () => {
  const cns = clsx(styles.avatar);
  return (
    <div className={cns}>
      <div className={`${styles['avatar__image']} animate-pulse`}></div>
      <div
        className={`${styles['avatar__creator']} bg-gray-primary animate-pulse`}
      >
        <span className="invisible">...Loading</span>
      </div>
    </div>
  );
};
