import { MainLayout } from '../../layout';
import { Container } from '../../layout/container';
import { Poster } from './components/poster/poster.tsx';
import { StandardCarousel } from '../../elements/standard-carousel';
import { Card } from '../../elements/card/card.tsx';
import ThumbnailImg from '../../../assets/thumbnail.jpeg';
import { VideoDetails } from './components/video-details';
import AvatarImg from '../../../assets/avatar.png';
import PosterImg from '../../../assets/video-details-banner.jpg';
import {
  allVideos,
  youMayAlsoLikeVideos,
} from '../../../data/carousel-data.ts';
import { useParams } from 'react-router-dom';
import { Typography } from '../../ui/typography';
import { text } from '../../../lib/text.ts';

export const VideoDetailsPage = () => {
  const { videoId } = useParams();
  const video = allVideos.find(({ id }) => id === videoId)!;

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
    <MainLayout displayHeader={false}>
      <Container>
        <Poster poster={PosterImg} likes={video.likes} views={video.views} />
        <VideoDetails
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
            {youMayAlsoLikeVideos.map(({ likes, id, views, title }) => (
              <Card
                id={id}
                key={id}
                title={title}
                likes={likes}
                views={views}
                coverImageSrc={ThumbnailImg}
              />
            ))}
          </StandardCarousel>
        </div>
      </Container>
    </MainLayout>
  );
};
