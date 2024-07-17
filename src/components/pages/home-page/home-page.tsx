import { MainLayout } from '../../layout';
import { HomeBanner } from './components';
import { Container } from '../../layout/container';
import { Creators } from '../../elements/creators';
import { NewVideosCarousel } from '../../elements/standard-carousel/carousels/new-videos-carousel.tsx';
import { PixelVideosCarousel } from '../../elements/standard-carousel/carousels/pixel-videos-carousel.tsx';
import { sendMessage } from '../../../lib/utils/tracking.ts';
import { IdType } from '../../../lib/types';
import { useEffect } from 'react';

export const HomePage = () => {
  useEffect(() => {
    sendMessage({
      event: 'flips_view_home',
      params: {},
    });
  }, []);

  const handleCreatorsClick = (authorId: IdType) => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'home',
        id: String(authorId),
        action: 'open',
        type: 'creator',
      },
    });
  };

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
          <Creators onClick={handleCreatorsClick} />
        </div>
      </Container>
    </MainLayout>
  );
};
