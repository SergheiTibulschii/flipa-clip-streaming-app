import { MainLayout } from '../../layout';
import { Container } from '../../layout/container';
import { Poster } from './components/poster/poster.tsx';
import { StandardCarousel } from '../../elements/standard-carousel';
import { Card } from '../../elements/card/card.tsx';
import { VideoDetails } from './components/video-details';
import { useLoaderData, useParams } from 'react-router-dom';
import { Typography } from '../../ui/typography';
import { text } from '../../../lib/text.ts';
import { VideoDetailsProvider } from '../../../context/video-details-context';
import { VideoDetailsLoaderType } from '../../../lib/types/video-details-types.ts';
import { useEffect } from 'react';
import { sendMessage } from '../../../lib/utils/tracking.ts';
import { useScrollToTop } from '../../../lib/hooks/useScrollToTop.ts';

export const VideoDetailsPage = () => {
  const { videoId } = useParams();
  const video = useLoaderData() as VideoDetailsLoaderType;
  useScrollToTop();

  useEffect(() => {
    if (video?.id) {
      sendMessage({
        event: 'flips_view',
        params: {
          id: String(video.id),
          type: 'media',
        },
      });
    }
  }, [video?.id]);

  if (!video) {
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
    <VideoDetailsProvider>
      <MainLayout displayHeader={false}>
        <Container>
          <Poster
            videoId={video.id}
            poster={video.featured_artwork}
            authorId={video.author_id}
            shareUrl={video.share_url}
          />
          <VideoDetails
            key={videoId}
            authorId={video.author_id}
            videoId={String(videoId)}
            title={video.title}
            description={video.description}
            actions={video.actions || []}
          />
          <div className="mt-8">
            <StandardCarousel title="You may also like">
              {video.suggestions.map(({ title, id, poster_artwork }) => (
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
    </VideoDetailsProvider>
  );
};
