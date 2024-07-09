import { text } from '../../../lib/text.ts';
import { CreatorsItem } from './components/creators-item/creators-item.tsx';
import { CreatorsItemSkeleton } from './components/creators-item/creators-item-skeleton.tsx';
import { SlidingPanel } from '../sliding-panel';
import { useAtomValue } from 'jotai';
import { authorsWithDefaultLoadable } from '../../../lib/jotai/atoms/authors.ts';

export const Creators = () => {
  const authors = useAtomValue(authorsWithDefaultLoadable);

  if (authors.state === 'hasError') {
    return null;
  }

  return (
    <SlidingPanel
      title={text.creators}
      isLoading={authors.state === 'loading'}
      skeletonItem={CreatorsItemSkeleton}
    >
      {authors.state !== 'loading' &&
        authors.data.map(({ name, picture, id }) => {
          return (
            <CreatorsItem key={id} id={id} name={name} thumbnail={picture} />
          );
        })}
    </SlidingPanel>
  );
};
