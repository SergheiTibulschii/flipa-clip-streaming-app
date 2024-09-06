import { MainLayout } from '../../layout';
import { Container } from '../../layout/container';
import { Poster } from './components/poster';
import { CreatorDetails } from './components/creator-details';
import { Creators } from '../../elements/creators';
import { StandardCarousel } from '../../elements/standard-carousel';
import { Card } from '../../elements/card/card.tsx';
import { useParams } from 'react-router-dom';
import { Typography } from '../../ui/typography';
import { text } from '../../../lib/text.ts';
import { sendMessage } from '../../../lib/utils/tracking.ts';
import { useEffect } from 'react';
import { AuthorDetailsType } from '../../../lib/types/flipa-clip-api-types.ts';
import { routes } from '../../../api';
import { Loader } from '../../elements/loader.tsx';
import { useExcessiveLoading } from '../../../lib/hooks/useExcessiveLoading.ts';
import { useApi } from '../../../api/swr';

const useCreatorDetails = (id: string) => {
  return useApi<AuthorDetailsType>(routes.authors.one(id), {
    revalidateIfStale: false,
    keepPreviousData: true,
  });
};

export const CreatorDetialsPage = () => {
  const params = useParams();
  const { data, isLoading, error } = useCreatorDetails(params.creatorId || '');
  const excessiveLoading = useExcessiveLoading(isLoading);

  useEffect(() => {
    if (data && !isLoading && !error && params.creatorId) {
      sendMessage({
        event: 'flips_view',
        params: {
          id: params.creatorId,
          type: 'creator',
        },
      });
    }
  }, [error, data, isLoading, params.creatorId]);

  if (!data) {
    return excessiveLoading ? <Loader className="animate-appear" /> : null;
  }

  if (!isLoading && !data) {
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
    <div
      style={{
        transition: isLoading ? 'opacity 0s' : 'opacity 0.5s',
        opacity: isLoading ? 0 : 1,
        width: '100%',
      }}
    >
      <MainLayout displayBecomeCreator={false} displayHeader={false}>
        <Container>
          <div className="pb-10 lg:pb-14">
            <Poster authorId={data!.id} poster={data!.banner} />
            <CreatorDetails author={data!} description={data!.bio} />
            <div className="mt-8">
              <StandardCarousel title="You may also like">
                {data!.videos.map(({ id, title, poster_artwork }) => (
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
                creators={data!.creators}
                onClick={handleCreatorsClick}
              />
            </div>
          </div>
        </Container>
      </MainLayout>
    </div>
  );
};
