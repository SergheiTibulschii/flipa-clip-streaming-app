import { MainLayout } from '../../layout';
import { Container } from '../../layout/container';
import { Poster } from './components/poster';
import CreatorPosterImg from '../../../assets/creator-details-banner.jpg';
import { CreatorDetails } from './components/creator-details';
import { Creators } from '../../elements/creators';
import { StandardCarousel } from '../../elements/standard-carousel';
import { Card } from '../../elements/card/card.tsx';
import { useLoaderData } from 'react-router-dom';
import { Typography } from '../../ui/typography';
import { text } from '../../../lib/text.ts';
import { AuthorType } from '../../../lib/types/authors.ts';
import { useAtomValue } from 'jotai';
import { videosWithDefaultAtom } from '../../../lib/jotai/atoms/videos';
import { IdType } from '../../../lib/types';
import { sendMessage } from '../../../lib/utils/tracking.ts';

export const CreatorDetialsPage = () => {
  const creator = useLoaderData() as AuthorType;
  const videos = useAtomValue(videosWithDefaultAtom);

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

  const handleCreatorsClick = (authorId: IdType) => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'creator',
        id: String(authorId),
        action: 'open',
        type: 'creator',
      },
    });
  };

  return (
    <MainLayout displayHeader={false} displayBecomeCreator={false}>
      <Container>
        <div className="pb-10 lg:pb-14">
          <Poster poster={CreatorPosterImg} />
          <CreatorDetails author={creator} description={creator.bio} />
          <div className="mt-8">
            <StandardCarousel title="You may also like">
              {videos
                .filter((v) => v.tag === 'you may also like')
                .map(({ id, title, artwork_url }) => (
                  <Card
                    id={id}
                    key={id}
                    title={title}
                    coverImageSrc={artwork_url}
                  />
                ))}
            </StandardCarousel>
          </div>
          <div className="mt-8">
            <Creators onClick={handleCreatorsClick} />
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};
