import { MainLayout } from '../../layout';
import { Container } from '../../layout/container';
import { Poster } from './components/poster/poster.tsx';
import { StandardCarousel } from '../../elements/standard-carousel';
import { Card } from '../../elements/card/card.tsx';
import ThumbnailImg from '../../../assets/thumbnail.jpeg';
import { VideoDetails } from './components/video-details';
import AvatarImg from '../../../assets/avatar.png';
import PosterImg from '../../../assets/video-details-banner.jpg';

export const VideoDetailsPage = () => {
  // const { videoId } = useParams();
  return (
    <MainLayout displayHeader={false}>
      <Container>
        <Poster poster={PosterImg} likes={43_000} views={89_200} />
        <VideoDetails
          creator={{
            name: 'TheGrossip',
            thumbnail: AvatarImg,
          }}
          title="Bucket List vs KirtiChow"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />
        <div className="mt-8">
          <StandardCarousel title="You may also like">
            {Array.from({ length: 10 }).map((_, index) => (
              <Card
                key={index}
                title={`Card ${index + 1}`}
                likes={index * 1000}
                views={index * 2000}
                coverImageSrc={ThumbnailImg}
              />
            ))}
          </StandardCarousel>
        </div>
      </Container>
    </MainLayout>
  );
};
