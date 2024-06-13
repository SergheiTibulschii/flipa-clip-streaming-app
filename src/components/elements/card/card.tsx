import styles from './styles/index.module.scss';
import { abbreviateNumber } from '../../../lib/utils/number.ts';
import { text } from '../../../lib/text.ts';

type CardProps = {
  title: string;
  likes?: number;
  views?: number;
  coverImageSrc?: string;
  className?: string;
};

export const Card = ({
  title,
  views = 0,
  likes = 0,
  coverImageSrc,
  className,
}: CardProps) => {
  return (
    <div className={className}>
      <div className={styles.card__cover}>
        <img
          className="w-full h-full object-cover"
          src={coverImageSrc}
          alt=""
        />
      </div>
      <div className="px-2">
        <div className={`${styles.card__title} mt-2 line-clamp-2`}>{title}</div>
        <div className="mt-1 text-[9px] text-gray-secondary font-bold">
          <span>
            {abbreviateNumber(likes)} {text.likes}
          </span>
          <span className="ml-1">
            {abbreviateNumber(views)} {text.views}
          </span>
        </div>
      </div>
    </div>
  );
};
