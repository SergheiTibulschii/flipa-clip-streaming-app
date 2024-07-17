import { ShareIcon } from '../icons.ts';
import { IconButton } from '../ui/button/icon-button.tsx';
import { text } from '../../lib/text.ts';
import { IdType } from '../../lib/types';

type ShareBtnProps = {
  shareUrl: string;
  videoId: IdType;
  onClick?: (videoId: IdType) => void;
};

export const ShareBtn = ({ shareUrl, videoId, onClick }: ShareBtnProps) => {
  const handleClick = async () => {
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
    <IconButton onClick={handleClick} variant="secondary">
      <ShareIcon />
    </IconButton>
  );
};
