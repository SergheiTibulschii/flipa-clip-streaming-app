import { HeartFilledIcon, HeartIcon } from '../../../icons.ts';
import { IconButton } from '../../../ui/button/icon-button.tsx';
import { useRef, useState } from 'react';
import { throttle } from '../../../../lib/utils/throttle.ts';
import {
  likeVideo,
  unlikeVideo,
} from '../../../../lib/supabase/toggleVideoLike.ts';
import { useSetAtom } from 'jotai';
import { videosToggleLikesAtom } from '../../../../lib/jotai/atoms/videos';
import { useAppStore } from '../../../../context/app-store-context';

type LikeBtnType = {
  videoId: string;
  authorId: string;
  isLikedDefault: boolean;
};

export const LikeBtn = ({ isLikedDefault, videoId, authorId }: LikeBtnType) => {
  const { userId } = useAppStore();
  const [liked, setLiked] = useState(isLikedDefault);
  const likeVideoRef = useRef<VoidFunction | null>(null);
  const likeRef = useRef(liked);
  const incrementLikes = useSetAtom(videosToggleLikesAtom);

  if (!likeVideoRef.current) {
    likeVideoRef.current = throttle(async () => {
      if (likeRef.current) {
        const { error } = await unlikeVideo(videoId, userId);
        if (!error) {
          await incrementLikes({ videoId, authorId, type: 'decr' });
          setLiked(false);
          likeRef.current = false;
        }
      } else {
        const { error } = await likeVideo(videoId, userId, authorId);
        if (!error) {
          await incrementLikes({ videoId, authorId, type: 'incr' });
          setLiked(true);
          likeRef.current = true;
        }
      }
    }, 1500);
  }

  return (
    <IconButton onClick={likeVideoRef.current} variant="secondary">
      {liked ? (
        <HeartFilledIcon className="text-pink" width={24} height={24} />
      ) : (
        <HeartIcon width={24} height={24} />
      )}
    </IconButton>
  );
};
