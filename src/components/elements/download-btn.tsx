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
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = title;
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

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
    <Button
      variant="secondary"
      iconBefore={<ProjectsIcon />}
      onClick={handleClick}
    >
      {title}
    </Button>
  );
};
