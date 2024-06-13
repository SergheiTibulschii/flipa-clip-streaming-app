import { abbreviateNumber } from '../../../../../lib/utils/number.ts';
import { text } from '../../../../../lib/text.ts';

type CreatorsItemProps = {
  title: string;
  thumbnail?: string;
  views?: number;
};

export const CreatorsItem = ({
  title,
  thumbnail,
  views = 0,
}: CreatorsItemProps) => {
  return (
    <div className="transition-opacity duration-300">
      <div className="aspect-square rounded-full bg-gray-secondary">
        <img
          className="w-full h-full object-cover rounded-full"
          src={thumbnail}
          alt=""
        />
      </div>
      <div className="px-2 text-center mt-2">
        <div className="text-sm leading-1.5 font-medium mt-2 line-clamp-2">
          {title}
        </div>
        <div className="mt-1 text-[9px] text-gray-secondary font-bold">
          <span className="ml-1">
            {abbreviateNumber(views)} {text.views}
          </span>
        </div>
      </div>
    </div>
  );
};
