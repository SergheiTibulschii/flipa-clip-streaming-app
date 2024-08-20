import { MainLayout } from '../../layout';
import { HomeBanner } from './components';
import { Container } from '../../layout/container';
import { Creators } from '../../elements/creators';
import { sendMessage } from '../../../lib/utils/tracking.ts';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { setAuthorsStateAtom } from '../../../lib/jotai/atoms/authors.ts';
import { setVideosStateAtom } from '../../../lib/jotai/atoms/videos.atom.ts';
import { Card } from '../../elements/card/card.tsx';
import { StandardCarousel } from '../../elements/standard-carousel';
import useSWR from 'swr';
import { apiV1 } from '../../../api/axios';
import { HomePageType } from '../../../lib/types/flipa-clip-api-types.ts';
import { routes } from '../../../api';
import { Typography } from '../../ui/typography';
import { text } from '../../../lib/text.ts';
import { Loader } from '../../elements/loader.tsx';

const useHomePageData = () => {
  const { data, isLoading, error } = useSWR(
    'home-page',
    async () =>
      apiV1
        .get<HomePageType>(routes.home)
        .then((r) => r.data)
        .catch(() => null),
    {
      revalidateIfStale: false,
      keepPreviousData: true,
    }
  );
  const setAuthorsState = useSetAtom(setAuthorsStateAtom);
  const setVideosState = useSetAtom(setVideosStateAtom);

  useEffect(() => {
    if (!isLoading && data && !error) {
      const authorIds = data.creators.map((c) => c.id);
      const videoIds = data.sections.flatMap((s) => s.content.map((c) => c.id));
      const [featuredVideo] = data.featured;

      if (featuredVideo) {
        videoIds.push(featuredVideo.id);
      }

      Promise.all([setAuthorsState(authorIds), setVideosState(videoIds)]);
    }
  }, [error, data, isLoading]);

  return {
    data,
    isLoading,
    error,
  };
};

export const HomePage = () => {
  const { isLoading, data } = useHomePageData();

  useEffect(() => {
    sendMessage({
      event: 'flips_view_home',
      params: {},
    });
  }, []);

  if (!isLoading && !data) {
    return (
      <MainLayout>
        <Container>
          <Typography className="mt-10" variant="h4">
            {text.videoDoesNotExist}
          </Typography>
        </Container>
      </MainLayout>
    );
  }

  if (!data) {
    return <Loader />;
  }

  const handleCreatorsClick = (authorId: string) => {
    sendMessage({
      event: 'flips_click',
      params: {
        from: 'home',
        id: authorId,
        action: 'open',
        type: 'creator',
      },
    });
  };

  return (
    <MainLayout>
      <Container>
        {data!.featured[0] && (
          <div className="mt-4">
            <HomeBanner
              videoId={data!.featured[0].id}
              title={data!.featured[0].title}
              description={data!.featured[0].description}
              coverUrl={data!.featured[0].featured_artwork}
              previewUrl={data!.featured[0].featured_preview}
              author={data!.featured[0].author}
            />
          </div>
        )}
        {data!.sections.map(({ title, content }) => (
          <div key={title} className="mt-8 empty:hidden">
            <StandardCarousel title={title}>
              {content.map(({ id, title, poster_artwork }) => (
                <Card
                  id={id}
                  key={id}
                  title={title}
                  coverImageSrc={poster_artwork}
                />
              ))}
            </StandardCarousel>
          </div>
        ))}
        <div className="mt-8">
          <Creators
            creators={data!.creators || []}
            onClick={handleCreatorsClick}
          />
        </div>
      </Container>
    </MainLayout>
  );
};
