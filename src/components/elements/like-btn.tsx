import { HeartFilledIcon, HeartIcon } from '../icons.ts';
import { IconButton } from '../ui/button/icon-button.tsx';
import { useRef, useState } from 'react';
import { throttle } from '../../lib/utils/throttle.ts';
import { likeVideo, unlikeVideo } from '../../lib/supabase/toggleVideoLike.ts';
import { useSetAtom } from 'jotai';
import { useAppStore } from '../../context/app-store-context';
import { incrementLikesAtom } from '../../lib/jotai/atoms/incrementLikes.atom.ts';
import { useSWRConfig } from 'swr';

type LikeBtnType = {
  videoId: string;
  authorId: string;
  isLikedDefault: boolean;
  onClick?: (liked: boolean) => void;
};

export const LikeBtn = ({
  isLikedDefault,
  videoId,
  authorId,
  onClick,
}: LikeBtnType) => {
  const { userId } = useAppStore();
  const [liked, setLiked] = useState(isLikedDefault);
  const likeVideoRef = useRef<VoidFunction | null>(null);
  const likeRef = useRef(liked);
  const incrementLikes = useSetAtom(incrementLikesAtom);
  const { mutate } = useSWRConfig();

  if (!likeVideoRef.current) {
    likeVideoRef.current = throttle(async () => {
      if (likeRef.current) {
        const { error } = await unlikeVideo(videoId, userId);
        if (!error) {
          await incrementLikes({ videoId, authorId, type: 'decr' });
          setLiked(false);
          likeRef.current = false;
          onClick?.(false);
        }
      } else {
        const { error } = await likeVideo(videoId, userId, authorId);
        if (!error) {
          await incrementLikes({ videoId, authorId, type: 'incr' });
          setLiked(true);
          likeRef.current = true;
          onClick?.(true);
        }
      }

      mutate(`video-stats-${videoId}`);
    }, 1500);
  }

  return (
    <IconButton onClick={likeVideoRef.current} variant="secondary">
      {liked ? (
        <HeartFilledIcon className="text-accent" width={24} height={24} />
      ) : (
        <HeartIcon className="text-white" width={24} height={24} />
      )}
    </IconButton>
  );
};
