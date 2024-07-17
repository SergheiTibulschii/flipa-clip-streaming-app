import { ProjectsIcon } from '../icons.ts';
import { text } from '../../lib/text.ts';
import { Button } from '../ui/button';

type DownloadBtnProps = {
  onClick: () => void;
};

export const DownloadBtn = ({ onClick }: DownloadBtnProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <Button
      className="mt-5"
      variant="secondary"
      iconBefore={<ProjectsIcon />}
      onClick={handleClick}
    >
      {text.downloadProject}
    </Button>
  );
};
