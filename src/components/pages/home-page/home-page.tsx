import { MainLayout } from '../../layout';
import { HomeBanner } from './components';
import { Container } from '../../layout/container';
import { Creators } from '../../elements/creators';
import { sendMessage } from '../../../lib/utils/tracking.ts';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai/index';
import { loadableHomePageAtom } from '../../../lib/jotai/atoms/homePage.atom.ts';
import { Loader } from '../../elements/loader.tsx';
import { useSetAtom } from 'jotai';
import { setAuthorsStateAtom } from '../../../lib/jotai/atoms/authors.ts';
import { setVideosStateAtom } from '../../../lib/jotai/atoms/videos.atom.ts';
import { HomePageDataType } from '../../../lib/types/home-page.types.ts';
import { Card } from '../../elements/card/card.tsx';
import { StandardCarousel } from '../../elements/standard-carousel';

const useHomePageData = () => {
  const homePageAtomValue = useAtomValue(loadableHomePageAtom);
  const setAuthorsState = useSetAtom(setAuthorsStateAtom);
  const setVideosState = useSetAtom(setVideosStateAtom);
  const [homePageData, setHomePageData] = useState<HomePageDataType | null>(
    null
  );
  const [homePageLoading, setHomePageLoading] = useState(true);
  const [homePageError, setHomePageError] = useState(false);

  useEffect(() => {
    if (homePageAtomValue.state === 'hasData') {
      const authorIds = homePageAtomValue.data.creators.map((c) => c.id);
      const videoIds = homePageAtomValue.data.sections.flatMap((s) =>
        s.content.map((c) => c.id)
      );
      const [featuredVideo] = homePageAtomValue.data.featured;

      if (featuredVideo) {
        videoIds.push(featuredVideo.id);
      }

      Promise.all([setAuthorsState(authorIds), setVideosState(videoIds)]);
      setHomePageData({
        ...homePageAtomValue.data,
        featured: featuredVideo,
      });
      setHomePageLoading(false);
    } else if (homePageAtomValue.state === 'hasError') {
      setHomePageError(true);
    }
  }, [homePageAtomValue.state]);

  return {
    homePageData,
    homePageLoading,
    homePageError,
  };
};

export const HomePage = () => {
  const { homePageError, homePageLoading, homePageData } = useHomePageData();

  useEffect(() => {
    sendMessage({
      event: 'flips_view_home',
      params: {},
    });
  }, []);

  if (homePageLoading) {
    return <Loader />;
  }

  if (homePageError) {
    throw new Error('Failed to fetch home page data');
  }

  if (!homePageData) {
    return null;
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
        <div className="mt-4">
          <HomeBanner
            videoId={homePageData.featured.id}
            title={homePageData.featured.title + 'test'}
            description={homePageData.featured.description}
            coverUrl={homePageData.featured.featured_artwork}
            previewUrl={homePageData.featured.featured_preview}
            author={homePageData.featured.author}
          />
        </div>
        {homePageData.sections.map(({ title, content }) => (
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
            creators={homePageData.creators || []}
            onClick={handleCreatorsClick}
          />
        </div>
      </Container>
    </MainLayout>
  );
};
