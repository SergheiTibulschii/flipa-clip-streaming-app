import { abbreviateNumber } from '../../../../../lib/utils/number.ts';
import { text } from '../../../../../lib/text.ts';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../../../lib/page-routes.ts';
import { useCreatorStats } from '../../../../../lib/jotai/hooks/useCreatorsStats.ts';
import { Image } from '../../../../ui/image.tsx';

type CreatorsItemProps = {
  id: string;
  name: string;
  thumbnail?: string;
  onClick?: (authorId: string) => void;
};

export const CreatorsItem = ({
  id,
  name,
  thumbnail,
  onClick,
}: CreatorsItemProps) => {
  const { views_count } = useCreatorStats(id);

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
        <Image
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
