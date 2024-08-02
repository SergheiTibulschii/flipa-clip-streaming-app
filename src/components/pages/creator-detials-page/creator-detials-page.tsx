import { MainLayout } from '../../layout';
import { Container } from '../../layout/container';
import { Poster } from './components/poster';
import { CreatorDetails } from './components/creator-details';
import { Creators } from '../../elements/creators';
import { StandardCarousel } from '../../elements/standard-carousel';
import { Card } from '../../elements/card/card.tsx';
import { useLoaderData } from 'react-router-dom';
import { Typography } from '../../ui/typography';
import { text } from '../../../lib/text.ts';
import { sendMessage } from '../../../lib/utils/tracking.ts';
import { useEffect } from 'react';
import { AuthorDetailsType } from '../../../lib/types/flipa-clip-api-types.ts';
import { useScrollToTop } from '../../../lib/hooks/useScrollToTop.ts';

export const CreatorDetialsPage = () => {
  const creator = useLoaderData() as AuthorDetailsType;
  useScrollToTop();

  useEffect(() => {
    if (creator?.id) {
      sendMessage({
        event: 'flips_view',
        params: {
          id: creator.id,
          type: 'creator',
        },
      });
    }
  }, [creator?.id]);

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

  const handleCreatorsClick = (authorId: string) => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'creator',
        id: authorId,
        action: 'open',
        type: 'creator',
      },
    });
  };

  return (
    <MainLayout displayHeader={false} displayBecomeCreator={false}>
      <Container>
        <div className="pb-10 lg:pb-14">
          <Poster authorId={creator.id} poster={creator.banner} />
          <CreatorDetails author={creator} description={creator.bio} />
          <div className="mt-8">
            <StandardCarousel title="You may also like">
              {creator.videos.map(({ id, title, poster_artwork }) => (
                <Card
                  id={id}
                  key={id}
                  title={title}
                  coverImageSrc={poster_artwork}
                />
              ))}
            </StandardCarousel>
          </div>
          <div className="mt-8">
            <Creators
              creators={creator.creators}
              onClick={handleCreatorsClick}
            />
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};
