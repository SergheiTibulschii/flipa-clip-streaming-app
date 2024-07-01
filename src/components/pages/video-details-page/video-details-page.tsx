import { MainLayout } from '../../layout';
import { Container } from '../../layout/container';
import { Poster } from './components/poster/poster.tsx';
import { StandardCarousel } from '../../elements/standard-carousel';
import { Card } from '../../elements/card/card.tsx';
import { VideoDetails } from './components/video-details';
import AvatarImg from '../../../assets/avatar.png';
import PosterImg from '../../../assets/video-details-banner.jpg';
import {
  allVideos,
  youMayAlsoLikeVideos,
} from '../../../data/carousel-data.ts';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Typography } from '../../ui/typography';
import { text } from '../../../lib/text.ts';
import { VideoDetailsProvider } from '../../../context/video-details-context';
import { VimeoVideoModal } from '../../elements/vimeo-video-modal.tsx';
import { useEffect, useState } from 'react';
import { useGoBack } from '../../../lib/hooks/useGoBack.ts';

export const VideoDetailsPage = () => {
  const { videoId } = useParams();
  const video = allVideos.find(({ id }) => id === videoId)!;
  const [query] = useSearchParams();
  const [playVideoUrl, setPlayVideoUrl] = useState<string | null>(
    query.get('videoUrl')
  );

  const location = useLocation();
  const goBack = useGoBack();

  useEffect(() => {
    setPlayVideoUrl(query.get('videoUrl'));
  }, [location.search, query]);

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
    <>
      <VideoDetailsProvider>
        <MainLayout displayHeader={false}>
          <Container>
            <Poster
              videoId={video.id}
              poster={PosterImg}
              authorId={video.creator.id}
              videoLink={video.media_url}
            />
            <VideoDetails
              key={videoId}
              creator={{
                id: video.creator.id,
                name: video.creator.name,
                thumbnail: AvatarImg,
              }}
              title={video.title}
              description={video.description}
            />
            <div className="mt-8">
              <StandardCarousel title="You may also like">
                {youMayAlsoLikeVideos.map(
                  ({ likes, id, views, title, thumbnail }) => (
                    <Card
                      id={id}
                      key={id}
                      title={title}
                      likes={likes}
                      views={views}
                      coverImageSrc={thumbnail}
                    />
                  )
                )}
              </StandardCarousel>
            </div>
          </Container>
        </MainLayout>
      </VideoDetailsProvider>
      {playVideoUrl && (
        <VimeoVideoModal
          videoId={video.id}
          authorId={video.creator.id}
          source={playVideoUrl}
          onClose={() => {
            goBack();
          }}
        />
      )}
    </>
  );
};
