import { Typography } from '../../../../ui/typography';
import { Avatar } from '../../../../elements/avatar';
import { ExpandableText } from '../../../../elements/expandable-text/expandable-text.tsx';
import { IdType } from '../../../../../lib/types';
import { Suspense } from 'react';
import { AvatarSkeleton } from '../../../../elements/avatar/avatar-skeleton.tsx';
import { DownloadBtn } from '../../../../elements/download-btn.tsx';
import { Button } from '../../../../ui/button';
import { useNavigate } from 'react-router-dom';
import { Action } from '../../../../../lib/types/flipa-clip-api-types.ts';

type VideoDetailsProps = {
  title: string;
  description: string;
  authorId: IdType;
  videoId: IdType;
  actions: Action[];
};

export const VideoDetails = ({
  title,
  description,
  authorId,
  videoId,
  actions,
}: VideoDetailsProps) => {
  const navigate = useNavigate();

  return (
    <div className="py-6">
      <Suspense fallback={<AvatarSkeleton />}>
        <Avatar id={authorId} />
      </Suspense>
      <Typography className="line-clamp-2 capitalize" variant="h4">
        {title}
      </Typography>
      <ExpandableText className="mt-1" text={description} />
      {actions.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-6">
          {actions.map(({ link, type, title }) =>
            type === 0 ? (
              <DownloadBtn
                key={title}
                videoId={String(videoId)}
                title={title}
                downloadLink={link}
              />
            ) : (
              <Button
                key={title}
                onClick={() => {
                  navigate(link);
                }}
                variant="secondary"
              >
                {title}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
};
