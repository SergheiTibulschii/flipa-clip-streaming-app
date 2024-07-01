import { text } from '../../../../lib/text.ts';
import { Button } from '../../../ui/button';
import { debounce } from '../../../../lib/utils/debounce.ts';
import { useAppStore } from '../../../../context/app-store-context';
import { pageRoutes } from '../../../../lib/page-routes.ts';
import { useNavigate } from 'react-router-dom';
import { viewVideo } from '../../../../lib/supabase/viewVideo.ts';
import { useSetAtom } from 'jotai';
import { videosIncrementViewsAtom } from '../../../../lib/jotai/atoms/videos.ts';

type PlayBtnProps = {
  videoId: number | string;
  authorId: number | string;
  videoLink: string;
};

export const PlayBtn = ({ videoId, videoLink, authorId }: PlayBtnProps) => {
  const navigate = useNavigate();
  const { userId } = useAppStore();
  const incrementViews = useSetAtom(videosIncrementViewsAtom);

  const handleClick = debounce(async () => {
    navigate(pageRoutes.video.play(videoId, encodeURIComponent(videoLink)));
    const { error } = await viewVideo(
      String(videoId),
      userId,
      String(authorId)
    );

    if (!error) {
      incrementViews({ videoId: String(videoId), authorId: String(authorId) });
    }
  }, 1000);

  return <Button onClick={handleClick}>{text.play}</Button>;
};
