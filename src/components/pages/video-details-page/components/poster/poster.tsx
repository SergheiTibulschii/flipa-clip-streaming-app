import styles from './styles/index.module.scss';
import { IconButton } from '../../../../ui/button/icon-button.tsx';
import { CaretLeftIcon } from '../../../../icons.ts';
import { VideoStats } from '../../../../elements/video-stats';
import { useGoBack } from '../../../../../lib/hooks/useGoBack.ts';
import { PlayBtn } from '../../../../elements/play-btn.tsx';
import { LikeBtn } from '../../../../elements/like-btn.tsx';
import { useSupabaseVideo } from '../../../../../lib/hooks/useSupabaseVideo.ts';
import { useVideoDetails } from '../../../../../context/video-details-context';
import { ShareBtn } from '../../../../elements/share-btn.tsx';
import { sendMessage } from '../../../../../lib/utils/tracking.ts';
import { IdType } from '../../../../../lib/types';

type PosterProps = {
  videoId: string | number;
  poster: string;
  authorId: string | number;
};

export const Poster = ({ videoId, poster, authorId }: PosterProps) => {
  const goBack = useGoBack();
  const { isLiked } = useVideoDetails();
  const supabaseVideo = useSupabaseVideo(String(videoId));

  if (!supabaseVideo) {
    return null;
  }

  const handlePlayBtnClick = () => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'movie',
        id: String(videoId),
        action: 'play',
        type: 'media',
      },
    });
  };

  const handleLikeBtnClick = (liked: boolean) => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'movie',
        id: String(videoId),
        action: !liked ? 'unlike' : 'like',
        type: 'media',
      },
    });
  };

  const handleShareBtnClick = (id: IdType) => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'movie',
        id: String(id),
        action: 'share',
        type: 'media',
      },
    });
  };

  return (
    <div className={styles.poster}>
      <div className={styles.poster__background}>
        <div className="aspect-video">
          <img
            src={poster}
            alt=""
            fetchPriority="high"
            className="image absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
          />
        </div>
      </div>
      <div className={styles.poster__content}>
        <div className="mb-auto">
          <IconButton onClick={goBack} variant="secondary">
            <CaretLeftIcon />
          </IconButton>
        </div>
        <div className="mt-auto flex gap-2">
          <div className="flex gap-2">
            <PlayBtn videoId={videoId} onClick={handlePlayBtnClick} />
            <LikeBtn
              key={videoId}
              videoId={String(videoId)}
              isLikedDefault={isLiked}
              authorId={String(authorId)}
              onClick={handleLikeBtnClick}
            />
            <ShareBtn
              shareUrl={supabaseVideo?.share_url}
              videoId={videoId}
              onClick={handleShareBtnClick}
            />
          </div>
          <VideoStats
            className="ml-auto"
            views={supabaseVideo?.stats?.views_count || 0}
            likes={supabaseVideo?.stats?.likes_count || 0}
          />
        </div>
      </div>
    </div>
  );
};
