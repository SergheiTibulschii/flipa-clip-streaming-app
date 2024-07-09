import { MainLayout } from '../../layout';
import { HomeBanner } from './components';
import { Container } from '../../layout/container';
import { Creators } from '../../elements/creators';
import { NewVideosCarousel } from '../../elements/standard-carousel/carousels/new-videos-carousel.tsx';
import { PixelVideosCarousel } from '../../elements/standard-carousel/carousels/pixel-videos-carousel.tsx';

export const HomePage = () => {
  return (
    <MainLayout>
      <Container>
        <div className="mt-4">
          <HomeBanner />
        </div>
        <div className="mt-8 empty:hidden">
          <NewVideosCarousel />
        </div>
        <div className="mt-8 empty:hidden">
          <PixelVideosCarousel />
        </div>
        <div className="mt-8">
          <Creators />
        </div>
      </Container>
    </MainLayout>
  );
};
