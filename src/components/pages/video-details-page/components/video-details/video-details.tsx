import { Typography } from '../../../../ui/typography';
import { Avatar } from '../../../../elements/avatar';
import { Button } from '../../../../ui/button';
import { text } from '../../../../../lib/text.ts';
import { ExpandableText } from '../../../../elements/expandable-text/expandable-text.tsx';
import { ProjectsIcon } from '../../../../icons.ts';
import { IdType } from '../../../../../lib/types';
import { Suspense } from 'react';
import { AvatarSkeleton } from '../../../../elements/avatar/avatar-skeleton.tsx';

type VideoDetailsProps = {
  title: string;
  description: string;
  authorId: IdType;
};

export const VideoDetails = ({
  title,
  description,
  authorId,
}: VideoDetailsProps) => {
  return (
    <div className="py-6">
      <Suspense fallback={<AvatarSkeleton />}>
        <Avatar id={authorId} className="mb-2" />
      </Suspense>
      <Typography className="line-clamp-2 capitalize" variant="h4">
        {title}
      </Typography>
      <ExpandableText className="mt-1" text={description} />
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
