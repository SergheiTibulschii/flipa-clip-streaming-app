import { text } from '../../../lib/text.ts';
import { useEffect, useState } from 'react';
import { CreatorsItem } from './components/creators-item/creators-item.tsx';
import { CreatorsItemSkeleton } from './components/creators-item/creators-item-skeleton.tsx';
import { partialCreators } from '../../../data/carousel-data.ts';
import { SlidingPanel } from '../sliding-panel';

export const Creators = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <SlidingPanel
      title={text.creators}
      isLoading={isLoading}
      skeletonItem={CreatorsItemSkeleton}
    >
      {partialCreators.map(({ name, thumbnail, id }) => (
        <CreatorsItem
          key={id}
          id={id}
          name={name}
          views={876_431}
          thumbnail={thumbnail}
        />
      ))}
    </SlidingPanel>
  );
};
