import { abbreviateNumber } from '../../../../../lib/utils/number.ts';
import { text } from '../../../../../lib/text.ts';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../../../lib/page-routes.ts';
import { useAtomValue } from 'jotai/index';
import { authorsWithDefaultLoadable } from '../../../../../lib/jotai/atoms/authors.ts';

type CreatorsItemProps = {
  id: number | string;
  name: string;
  thumbnail?: string;
};

export const CreatorsItem = ({ id, name, thumbnail }: CreatorsItemProps) => {
  const creators = useAtomValue(authorsWithDefaultLoadable);
  const viewsCount =
    (creators.state !== 'loading' &&
      creators.state !== 'hasError' &&
      creators.data.find((c) => c.author_id === id)?.views_count) ||
    0;
  return (
    <Link
      to={pageRoutes.creator.details(id)}
      className="transition-opacity duration-300"
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
            {abbreviateNumber(viewsCount)} {text.views}
          </span>
        </div>
      </div>
    </Link>
  );
};
