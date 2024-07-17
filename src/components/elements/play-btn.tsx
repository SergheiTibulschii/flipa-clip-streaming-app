import { text } from '../../lib/text.ts';
import { Button } from '../ui/button';
import { debounce } from '../../lib/utils/debounce.ts';
import { pageRoutes } from '../../lib/page-routes.ts';
import { useNavigate } from 'react-router-dom';

type PlayBtnProps = {
  videoId: number | string;
  onClick?: () => void;
};

export const PlayBtn = ({ videoId, onClick }: PlayBtnProps) => {
  const navigate = useNavigate();

  const handleClick = debounce(async () => {
    onClick?.();
    navigate(pageRoutes.video.play(videoId));
  }, 1000);

  return <Button onClick={handleClick}>{text.play}</Button>;
};
