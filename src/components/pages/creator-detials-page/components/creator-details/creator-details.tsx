import { Typography } from '../../../../ui/typography';
import { ExpandableText } from '../../../../elements/expandable-text/expandable-text.tsx';
import { Button } from '../../../../ui/button';
import { text } from '../../../../../lib/text.ts';

type CreatorDetailsProps = {
  creator: {
    name: string;
    thumbnail?: string;
  };
  description: string;
};

export const CreatorDetails = ({
  creator,
  description,
}: CreatorDetailsProps) => {
  return (
    <div className="relative">
      <div className="-mt-[50px]">
        <img
          className="image w-[100px] h-[100px] rounded-full mx-auto"
          src={creator.thumbnail}
          alt=""
        />
      </div>
      <Typography
        className="mt-10 lg:max-w-[80%] break-all line-clamp-3"
        variant="h4"
      >
        {creator.name}
      </Typography>
      <ExpandableText className="mt-2 lg:max-w-[75%]" text={description} />
      <div className="flex gap-2 mt-5">
        <Button variant="secondary">{text.creatorsSite}</Button>
        <Button variant="secondary">{text.favoriteBrushes}</Button>
      </div>
    </div>
  );
};
