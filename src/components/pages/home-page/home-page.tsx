import { MainLayout } from '../../layout';
import { HomeBanner } from './components';
import { Container } from '../../layout/container';
import HeroBannerImg from '../../../assets/hero-banner.png';
import ThumbnailImg from '../../../assets/thumbnail.jpeg';
import AvatarImg from '../../../assets/avatar.png';
import { StandardCarousel } from '../../elements/standard-carousel';
import { Card } from '../../elements/card/card.tsx';
import { Creators } from '../../elements/creators';

const bannerData = {
  title: 'Bucket List vs KirtiChow',
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
  likes: 43_000,
  views: 89_200,
  backgroundImageSrc: HeroBannerImg,
  creator: {
    name: 'TheGrossip',
    avatar: AvatarImg,
  },
};

export const HomePage = () => {
  return (
    <MainLayout>
      <Container>
        <div className="mt-4">
          <HomeBanner
            title={bannerData.title}
            backgroundImageSrc={HeroBannerImg}
            description={bannerData.description}
            likes={bannerData.likes}
            views={bannerData.views}
            creator={bannerData.creator}
          />
        </div>
        <div className="mt-8">
          <StandardCarousel title="New">
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
        <div className="mt-8">
          <StandardCarousel title="Pixel Movies">
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
        <div className="mt-8">
          <Creators />
        </div>
      </Container>
    </MainLayout>
  );
};
