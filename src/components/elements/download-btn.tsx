import { ProjectsIcon } from '../icons.ts';
import { Button } from '../ui/button';
import { sendMessage } from '../../lib/utils/tracking.ts';

type DownloadBtnProps = {
  title: string;
  downloadLink: string;
  videoId: string;
};

export const DownloadBtn = ({
  downloadLink,
  title,
  videoId,
}: DownloadBtnProps) => {
  const handleClick = () => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'movie',
        id: videoId,
        action: 'download_project',
        type: 'media',
      },
    });
    sendMessage({ url: downloadLink }, 'deeplink');
  };

  return (
    <Button
      variant="secondary"
      iconBefore={<ProjectsIcon />}
      onClick={handleClick}
    >
      {title}
    </Button>
  );
};
