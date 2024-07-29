import { abbreviateNumber } from '../../../../../lib/utils/number.ts';
import { text } from '../../../../../lib/text.ts';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../../../lib/page-routes.ts';
import { IdType } from '../../../../../lib/types';
import { useCreatorStats } from '../../../../../lib/jotai/hooks/useCreatorsStats.ts';

type CreatorsItemProps = {
  id: number | string;
  name: string;
  thumbnail?: string;
  onClick?: (authorId: IdType) => void;
};

export const CreatorsItem = ({
  id,
  name,
  thumbnail,
  onClick,
}: CreatorsItemProps) => {
  const { views_count } = useCreatorStats(String(id));

  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <Link
      to={pageRoutes.creator.details(id)}
      className="transition-opacity duration-300"
      onClick={handleClick}
    >
      {/*{value && <div>{value.likes_count}</div>}*/}
      <div className="aspect-square rounded-full bg-gray-secondary">
        <img
          className="image rounded-full"
          src={thumbnail}
          alt={`${name}'s avatar`}
          loading="lazy"
        />
      </div>
      <div className="px-2 text-center mt-2">
        <div
          title={name}
          className="text-sm leading-1.5 font-medium mt-2 truncate"
        >
          {name}
        </div>
        <div className="mt-1 text-[9px] text-gray-secondary font-bold">
          <span className="ml-1">
            {abbreviateNumber(views_count)} {text.views}
          </span>
        </div>
      </div>
    </Link>
  );
};
