import { Card } from '../../card/card.tsx';
import { StandardCarousel } from '../standard-carousel.tsx';
import { useAtomValue } from 'jotai/index';
import { videosWithDefaultAtom } from '../../../../lib/jotai/atoms/videos';

export const PixelVideosCarousel = () => {
  const videos = useAtomValue(videosWithDefaultAtom);
  const pixelVideos = videos.filter((v) => v.tag === 'pixel videos');

  return (
    pixelVideos.length > 0 && (
      <StandardCarousel title="Pixel Movies">
        {pixelVideos.map(({ title, id, artwork_url }) => (
          <Card id={id} key={id} title={title} coverImageSrc={artwork_url} />
        ))}
      </StandardCarousel>
    )
  );
};
