import { MainLayout } from '../../layout';
import { Container } from '../../layout/container';
import { Poster } from './components/poster/poster.tsx';
import { StandardCarousel } from '../../elements/standard-carousel';
import { Card } from '../../elements/card/card.tsx';
import { VideoDetails } from './components/video-details';
import PosterImg from '../../../assets/video-details-banner.jpg';
import { useLoaderData, useParams } from 'react-router-dom';
import { Typography } from '../../ui/typography';
import { text } from '../../../lib/text.ts';
import { VideoDetailsProvider } from '../../../context/video-details-context';
import { VideoDetailsLoaderType } from '../../../lib/types/video-details-types.ts';
import { useAtomValue } from 'jotai/index';
import { videosWithDefaultAtom } from '../../../lib/jotai/atoms/videos';

export const VideoDetailsPage = () => {
  const { videoId } = useParams();
  const video = useLoaderData() as VideoDetailsLoaderType;
  const videos = useAtomValue(videosWithDefaultAtom);

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
            poster={PosterImg}
            authorId={video.author_id}
          />
          <VideoDetails
            key={videoId}
            authorId={video.author_id}
            title={video.title}
            description={video.description}
          />
          <div className="mt-8">
            <StandardCarousel title="You may also like">
              {videos
                .filter((v) => v.tag === 'upcomming')
                .map(({ title, id, artwork_url }) => (
                  <Card
                    id={id}
                    key={id}
                    title={title}
                    coverImageSrc={artwork_url}
                  />
                ))}
            </StandardCarousel>
          </div>
        </Container>
      </MainLayout>
    </VideoDetailsProvider>
  );
};
