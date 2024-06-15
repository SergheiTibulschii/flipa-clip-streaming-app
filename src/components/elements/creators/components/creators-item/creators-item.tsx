import { abbreviateNumber } from '../../../../../lib/utils/number.ts';
import { text } from '../../../../../lib/text.ts';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../../../lib/page-routes.ts';

type CreatorsItemProps = {
  id: number | string;
  name: string;
  thumbnail?: string;
  views?: number;
};

export const CreatorsItem = ({
  id,
  name,
  thumbnail,
  views = 0,
}: CreatorsItemProps) => {
  return (
    <Link
      to={pageRoutes.creator.details(id)}
      className="transition-opacity duration-300"
    >
      <div className="aspect-square rounded-full bg-gray-secondary">
        <img className="image rounded-full" src={thumbnail} alt="" />
      </div>
      <div className="px-2 text-center mt-2">
        <div className="text-sm leading-1.5 font-medium mt-2 line-clamp-2">
          {name}
        </div>
        <div className="mt-1 text-[9px] text-gray-secondary font-bold">
          <span className="ml-1">
            {abbreviateNumber(views)} {text.views}
          </span>
        </div>
      </div>
    </Link>
  );
};
