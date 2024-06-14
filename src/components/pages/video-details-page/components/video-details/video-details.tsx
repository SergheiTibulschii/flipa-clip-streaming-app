import { Typography } from '../../../../ui/typography';
import { Avatar } from '../../../../elements/avatar';
import { Button } from '../../../../ui/button';
import { text } from '../../../../../lib/text.ts';
import { ExpandableText } from '../../../../elements/expandable-text/expandable-text.tsx';
import { ProjectsIcon } from '../../../../icons.ts';

type VideoDetailsProps = {
  title: string;
  description: string;
  creator: {
    name?: string;
    thumbnail?: string;
  };
};

export const VideoDetails = ({
  title,
  description,
  creator,
}: VideoDetailsProps) => {
  return (
    <div className="py-6">
      <Avatar
        className="mb-2"
        name={creator.name}
        thumbnail={creator.thumbnail}
      />
      <Typography
        className="lg:max-w-[80%] break-all line-clamp-3"
        variant="h4"
      >
        {title}
      </Typography>
      <ExpandableText className="mt-1 lg:max-w-[75%]" text={description} />
      <Button
        className="mt-5"
        variant="secondary"
        iconBefore={<ProjectsIcon />}
      >
        {text.downloadProject}
      </Button>
    </div>
  );
};
