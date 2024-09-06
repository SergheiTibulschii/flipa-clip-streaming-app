import { MainLayout } from '../../layout';
import { Container } from '../../layout/container';
import { Poster } from './components/poster/poster.tsx';
import { StandardCarousel } from '../../elements/standard-carousel';
import { Card } from '../../elements/card/card.tsx';
import { VideoDetails } from './components/video-details';
import { useParams } from 'react-router-dom';
import { Typography } from '../../ui/typography';
import { text } from '../../../lib/text.ts';
import { useEffect, useMemo } from 'react';
import { sendMessage } from '../../../lib/utils/tracking.ts';
import useSWR from 'swr';
import { VideoDetailsType } from '../../../lib/types/flipa-clip-api-types.ts';
import { routes } from '../../../api';
import { getVideoStats } from '../../../lib/supabase/getVideoStats.ts';
import { useAppStore } from '../../../context/app-store-context';
import { useSetAtom } from 'jotai/index';
import { addVideoToStatsAtom } from '../../../lib/jotai/atoms/videos.atom.ts';
import { Loader } from '../../elements/loader.tsx';
import { useExcessiveLoading } from '../../../lib/hooks/useExcessiveLoading.ts';
import { useApi } from '../../../api/swr';

const useVideoDetails = (id: string, userId: string) => {
  const shouldFetch = Boolean(id && userId);
  const addVideoToStats = useSetAtom(addVideoToStatsAtom);
  const { data, isLoading } = useApi<VideoDetailsType>(
    shouldFetch ? routes.videos.one(id) : '',
    {
      revalidateIfStale: false,
      keepPreviousData: true,
    }
  );
  const { data: statsData, isLoading: isStatsLoading } = useSWR(
    shouldFetch ? `video-stats-${id}` : null,
    async () => getVideoStats(id, userId),
    {
      revalidateIfStale: false,
      keepPreviousData: true,
    }
  );
  const { user_liked, ...stats } = statsData?.data || {
    video_id: id,
    views_count: 0,
    likes_count: 0,
    author_id: data?.author_id || '',
    user_liked: false,
  };
  const loading = isLoading || isStatsLoading || !data;
  const result = useMemo(
    () =>
      data
        ? {
            isLiked: user_liked,
            ...data,
            stats,
          }
        : null,
    [data?.id]
  );

  useEffect(() => {
    if (!loading && result?.id) {
      addVideoToStats({
        video_id: stats.video_id,
        author_id: stats.author_id,
        views_count: stats.views_count,
        likes_count: stats.likes_count,
      });
    }
  }, [loading, result?.id]);

  return {
    data: result,
    isLoading: isLoading || isStatsLoading || !data,
  };
};

export const VideoDetailsPage = () => {
  const params = useParams();
  const { userId } = useAppStore();
  const { isLoading, data } = useVideoDetails(params.videoId || '', userId);
  const excessiveLoading = useExcessiveLoading(isLoading);

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

  if (!data) {
    return excessiveLoading ? <Loader className="animate-appear" /> : null;
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
    <div
      style={{
        transition: isLoading ? 'opacity 0s' : 'opacity 0.5s',
        opacity: isLoading ? 0 : 1,
        width: '100%',
      }}
    >
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
              {data?.suggestions.map(({ title, id, poster_artwork }) => (
                <Card
                  id={id}
                  key={id}
                  title={title}
                  coverImageSrc={poster_artwork}
                />
              ))}
            </StandardCarousel>
          </div>
        </Container>
      </MainLayout>
    </div>
  );
};
