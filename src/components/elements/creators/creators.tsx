import { text } from '../../../lib/text.ts';
import { CreatorsItem } from './components/creators-item/creators-item.tsx';
import { CreatorsItemSkeleton } from './components/creators-item/creators-item-skeleton.tsx';
import { partialCreators } from '../../../data/carousel-data.ts';
import { SlidingPanel } from '../sliding-panel';
import { useAtomValue } from 'jotai';
import { authorsWithDefaultLoadable } from '../../../lib/jotai/atoms/authors.ts';

export const Creators = () => {
  const creators = useAtomValue(authorsWithDefaultLoadable);

  return (
    <SlidingPanel
      title={text.creators}
      isLoading={creators.state === 'loading'}
      skeletonItem={CreatorsItemSkeleton}
    >
      {partialCreators.map(({ name, thumbnail, id }) => {
        return (
          <CreatorsItem key={id} id={id} name={name} thumbnail={thumbnail} />
        );
      })}
    </SlidingPanel>
  );
};
