import { text } from '../../../../lib/text.ts';
import { Button } from '../../../ui/button';
import { debounce } from '../../../../lib/utils/debounce.ts';
import { pageRoutes } from '../../../../lib/page-routes.ts';
import { useNavigate } from 'react-router-dom';

type PlayBtnProps = {
  videoId: number | string;
};

export const PlayBtn = ({ videoId }: PlayBtnProps) => {
  const navigate = useNavigate();

  const handleClick = debounce(async () => {
    navigate(pageRoutes.video.play(videoId));
  }, 1000);

  return <Button onClick={handleClick}>{text.play}</Button>;
};
