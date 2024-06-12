import { MainLayout } from '../../layout';
import { HomeBanner } from './components';
import { Container } from '../../layout/container.tsx';
import HeroBannerImg from '../../../assets/hero-banner.png';
import AvatarImg from '../../../assets/avatar.png';

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
      </Container>
    </MainLayout>
  );
};
