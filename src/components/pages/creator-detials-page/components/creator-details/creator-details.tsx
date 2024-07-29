import { Typography } from '../../../../ui/typography';
import { ExpandableText } from '../../../../elements/expandable-text/expandable-text.tsx';
import { Button } from '../../../../ui/button';
import { text } from '../../../../../lib/text.ts';
import { AuthorDetailsType } from '../../../../../lib/types/flipa-clip-api-types.ts';

type CreatorDetailsProps = {
  author: AuthorDetailsType;
  description: string;
};

export const CreatorDetails = ({
  author,
  description,
}: CreatorDetailsProps) => {
  return (
    <div className="relative">
      <div className="-mt-[50px]">
        <img
          className="image w-[100px] h-[100px] rounded-full mx-auto"
          src={author.avatar}
          alt=""
        />
      </div>
      <Typography className="mt-10 line-clamp-2" variant="h4">
        {author.name}
      </Typography>
      <ExpandableText className="mt-2" text={description} />
      <div className="flex gap-2 mt-5">
        <Button variant="secondary">{text.creatorsSite}</Button>
        <Button variant="secondary">{text.favoriteBrushes}</Button>
      </div>
    </div>
  );
};
