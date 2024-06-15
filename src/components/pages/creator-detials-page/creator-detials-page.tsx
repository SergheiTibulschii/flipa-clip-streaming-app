import { MainLayout } from '../../layout';
import { Container } from '../../layout/container';
import { Poster } from './components/poster';
import CreatorPosterImg from '../../../assets/creator-details-banner.jpg';
import { CreatorDetails } from './components/creator-details';
import { Creators } from '../../elements/creators';
import { StandardCarousel } from '../../elements/standard-carousel';
import { Card } from '../../elements/card/card.tsx';
import ThumbnailImg from '../../../assets/thumbnail.jpeg';
import { useParams } from 'react-router-dom';
import {
  allCreators,
  youMayAlsoLikeVideos,
} from '../../../data/carousel-data.ts';
import { Typography } from '../../ui/typography';
import { text } from '../../../lib/text.ts';

export const CreatorDetialsPage = () => {
  const { creatorId } = useParams();
  const creator = allCreators.find(({ id }) => id === creatorId)!;

  if (!creator) {
    return (
      <MainLayout>
        <Container>
          <Typography className="mt-10" variant="h4">
            {text.creatorDoesNotExist}
          </Typography>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout displayHeader={false} displayBecomeCreator={false}>
      <Container>
        <div className="pb-10 lg:pb-14">
          <Poster poster={CreatorPosterImg} />
          <CreatorDetails creator={creator} description={creator.about} />
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
          <div className="mt-8">
            <Creators />
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};
