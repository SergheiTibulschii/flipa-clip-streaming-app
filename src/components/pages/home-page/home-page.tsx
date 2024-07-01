import { MainLayout } from '../../layout';
import { HomeBanner } from './components';
import { Container } from '../../layout/container';
import HeroBannerImg from '../../../assets/hero-banner.png';
import { StandardCarousel } from '../../elements/standard-carousel';
import { Card } from '../../elements/card/card.tsx';
import { Creators } from '../../elements/creators';
import {
  allVideos,
  newVideos,
  pixelVideos,
} from '../../../data/carousel-data.ts';

export const HomePage = () => {
  const topRated = allVideos[0];

  return (
    <MainLayout>
      <Container>
        <div className="mt-4">
          <HomeBanner
            videoId={topRated.id}
            vimeoId={topRated.vimeoId}
            title={topRated.title}
            backgroundImageSrc={HeroBannerImg}
            description={topRated.description}
            creator={topRated.creator}
          />
        </div>
        <div className="mt-8">
          <StandardCarousel title="New">
            {newVideos.map(({ title, id, thumbnail }) => (
              <Card id={id} key={id} title={title} coverImageSrc={thumbnail} />
            ))}
          </StandardCarousel>
        </div>
        <div className="mt-8">
          <StandardCarousel title="Pixel Movies">
            {pixelVideos.map(({ id, title, thumbnail }) => (
              <Card id={id} key={id} title={title} coverImageSrc={thumbnail} />
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
