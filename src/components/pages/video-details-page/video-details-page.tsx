import { MainLayout } from '../../layout';
import { Container } from '../../layout/container';
import { Poster } from './components/poster/poster.tsx';
import { StandardCarousel } from '../../elements/standard-carousel';
import { Card } from '../../elements/card/card.tsx';
import { VideoDetails } from './components/video-details';
import { useParams } from 'react-router-dom';
import { Typography } from '../../ui/typography';
import { text } from '../../../lib/text.ts';
import { useEffect } from 'react';
import { sendMessage } from '../../../lib/utils/tracking.ts';
import { useScrollToTop } from '../../../lib/hooks/useScrollToTop.ts';
import useSWR from 'swr';
import { apiV1 } from '../../../api/axios';
import { VideoDetailsType } from '../../../lib/types/flipa-clip-api-types.ts';
import { routes } from '../../../api';
import { getVideoStats } from '../../../lib/supabase/getVideoStats.ts';
import { useAppStore } from '../../../context/app-store-context';
import { Loader } from '../../elements/loader.tsx';
import { useSetAtom } from 'jotai/index';
import { addVideoToStatsAtom } from '../../../lib/jotai/atoms/videos.atom.ts';

const useVideoDetails = (id: string, userId: string) => {
  const shouldFetch = Boolean(id && userId);
  const addVideoToStats = useSetAtom(addVideoToStatsAtom);
  const { data, isLoading } = useSWR(
    shouldFetch ? `video-details-${id}` : null,
    async () => {
      return Promise.all([
        apiV1
          .get<VideoDetailsType>(routes.videos.one(id))
          .then((r) => r.data)
          .catch(() => null),
        getVideoStats(id, userId),
      ]);
    },
    {
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );

  if (data) {
    const [videoDetails, videoStats] = data;

    if (videoDetails && videoStats.data) {
      const { user_liked, ...stats } = videoStats.data || {
        video_id: id,
        views_count: 0,
        likes_count: 0,
        author_id: videoDetails.author_id || '',
        user_liked: false,
      };
      addVideoToStats({
        video_id: stats.video_id,
        author_id: stats.author_id,
        views_count: stats.views_count,
        likes_count: stats.likes_count,
      });
      return {
        data: {
          isLiked: user_liked,
          ...videoDetails,
          stats,
        },
        isLoading,
      };
    }
  }

  return { data: null, isLoading };
};

export const VideoDetailsPage = () => {
  const params = useParams();
  const { userId } = useAppStore();
  useScrollToTop();
  const { isLoading, data } = useVideoDetails(params.videoId || '', userId);

  useEffect(() => {
    if (data?.id) {
      sendMessage({
        event: 'flips_view',
        params: {
          id: data.id,
          type: 'media',
        },
      });
    }
  }, [data?.id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !data) {
    return (
      <MainLayout>
        <Container>
          <Typography className="mt-10" variant="h4">
            {text.videoDoesNotExist}
          </Typography>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout displayHeader={false}>
      <Container>
        <Poster
          videoId={data!.id}
          poster={data!.featured_artwork}
          authorId={data!.author_id}
          shareUrl={data!.share_url}
          isLiked={data!.isLiked}
        />
        <VideoDetails
          key={data!.id}
          authorId={data!.author_id}
          videoId={data!.id}
          title={data!.title}
          description={data!.description}
          actions={data!.actions || []}
        />
        <div className="mt-8">
          <StandardCarousel title="You may also like">
            {data!.suggestions.map(({ title, id, poster_artwork }) => (
              <Card
                id={id}
                key={id}
                title={title}
                coverImageSrc={poster_artwork}
              />
            ))}
          </StandardCarousel>
        </div>
        <video preload="auto">
          <source src={data!.video_source} />
        </video>
      </Container>
    </MainLayout>
  );
};
