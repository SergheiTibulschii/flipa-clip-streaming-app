import { Card } from '../../card/card.tsx';
import { StandardCarousel } from '../standard-carousel.tsx';
import { useAtomValue } from 'jotai/index';
import { videosWithDefaultAtom } from '../../../../lib/jotai/atoms/videos';

export const NewVideosCarousel = () => {
  const videos = useAtomValue(videosWithDefaultAtom);
  const newVideos = videos.filter((v) => v.tag === 'new');

  return (
    newVideos.length > 0 && (
      <StandardCarousel title="New">
        {newVideos.map(({ title, id, artwork_url }) => (
          <Card id={id} key={id} title={title} coverImageSrc={artwork_url} />
        ))}
      </StandardCarousel>
    )
  );
};
