import { ShareIcon } from '../icons.ts';
import { IconButton, IconButtonProps } from '../ui/button/icon-button.tsx';
import { text } from '../../lib/text.ts';

type ShareBtnProps = {
  shareUrl: string;
  videoId: string;
  onClick?: (videoId: string) => void;
  variant?: IconButtonProps['variant'];
};

export const ShareBtn = ({
  shareUrl,
  videoId,
  onClick,
  variant = 'secondary',
}: ShareBtnProps) => {
  const handleClick = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    if (navigator.share) {
      await navigator.share({
        title: document.title,
        text: text.checkThisVideoOut,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }

    onClick?.(videoId);
  };

  return (
    <IconButton onClick={handleClick} variant={variant}>
      <ShareIcon />
    </IconButton>
  );
};
