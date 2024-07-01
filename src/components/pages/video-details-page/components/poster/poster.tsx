import styles from './styles/index.module.scss';
import { IconButton } from '../../../../ui/button/icon-button.tsx';
import { CaretLeftIcon, ShareIcon } from '../../../../icons.ts';
import { VideoStats } from '../../../../elements/video-stats';
import { useGoBack } from '../../../../../lib/hooks/useGoBack.ts';
import { PlayBtn } from '../play-btn.tsx';
import { useLoaderData } from 'react-router-dom';
import { VideoDetailsLoaderType } from '../../../../../lib/types/video-details-types.ts';
import { LikeBtn } from '../like-btn.tsx';
import { useSupabaseVideo } from '../../../../../lib/hooks/useSupabaseVideo.ts';

type PosterProps = {
  videoId: string | number;
  poster: string;
  authorId: string | number;
  videoLink: string;
};

export const Poster = ({
  videoId,
  poster,
  authorId,
  videoLink,
}: PosterProps) => {
  const goBack = useGoBack();
  const loaderData = useLoaderData() as VideoDetailsLoaderType;
  // const { likesCount, viewsCount } = useVideoDetails();
  const supabaseVideo = useSupabaseVideo(String(videoId));

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
            <PlayBtn
              authorId={authorId}
              videoId={videoId}
              videoLink={videoLink}
            />
            <LikeBtn
              videoId={loaderData.video_id}
              isLikedDefault={loaderData.isLiked}
              authorId={String(authorId)}
            />
            <IconButton variant="secondary">
              <ShareIcon />
            </IconButton>
          </div>
          <VideoStats
            className="ml-auto"
            views={supabaseVideo?.views_count || 0}
            likes={supabaseVideo?.likes_count || 0}
          />
        </div>
      </div>
    </div>
  );
};
