import { Typography } from '../../../../ui/typography';
import { Avatar } from '../../../../elements/avatar';
import { ExpandableText } from '../../../../elements/expandable-text/expandable-text.tsx';
import { IdType } from '../../../../../lib/types';
import { Suspense } from 'react';
import { AvatarSkeleton } from '../../../../elements/avatar/avatar-skeleton.tsx';
import { DownloadBtn } from '../../../../elements/download-btn.tsx';
import { sendMessage } from '../../../../../lib/utils/tracking.ts';

type VideoDetailsProps = {
  title: string;
  description: string;
  authorId: IdType;
  videoId: IdType;
};

export const VideoDetails = ({
  title,
  description,
  authorId,
  videoId,
}: VideoDetailsProps) => {
  const handleDownloadClick = () => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'movie',
        id: String(videoId),
        action: 'download_project',
        type: 'media',
      },
    });
  };

  return (
    <div className="py-6">
      <Suspense fallback={<AvatarSkeleton />}>
        <Avatar id={authorId} />
      </Suspense>
      <Typography className="line-clamp-2 capitalize" variant="h4">
        {title}
      </Typography>
      <ExpandableText className="mt-1" text={description} />
      <DownloadBtn onClick={handleDownloadClick} />
    </div>
  );
};
